import { useEffect, useState } from 'react'
import { listenAllTodos, deleteTodo, updateTodo } from '../../firebase/client'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useUser from '@/hooks/useUser'

import Image from 'next/image'
import deleteIcon from '@/assets/icons/delete.svg'
import reorderIcon from '@/assets/icons/reorder.svg'
import loader from '@/assets/images/loader.svg'

import { toast } from 'sonner'

export default function ListTodos (): JSX.Element {
	const [loading, setLoading] = useState({ todos: true, delete: false, completed: false })
	const user = useUser()
	interface Todo {
		id: string
		text: string
		completed: boolean
	}
	const [todos, setTodos] = useState<Todo[]>([])

	useEffect(() => {
		setLoading(loading => ({ ...loading, todos: true }))
		if (user != null) {
			listenAllTodos(user.uid, setTodos)
				.catch(() => { toast.error('Error loading todos') })
				.finally(() => { setLoading(loading => ({ ...loading, todos: false })) })
		}
		if (user === null) {
			setTodos(Object.values(JSON.parse(localStorage.getItem('todos') ?? '{}')))
			setLoading(loading => ({ ...loading, todos: false }))
		}
	}, [user])

	function handleComplete (todo: Todo): void {
		if (user === null) {
			const storageTodos = JSON.parse(localStorage.getItem('todos') ?? '{}')
			const updatedTodos = {
				...storageTodos,
				[todo.id]: {
					...todo,
					completed: !todo.completed
				}
			}
			localStorage.setItem('todos', JSON.stringify(updatedTodos))
			setTodos(Object.values(updatedTodos))
		} else {
			setLoading({ ...loading, completed: true })
			updateTodo({ id: todo.id, uid: user?.uid ?? '', todo: { ...todo, completed: !todo.completed } })
				.catch(() => { toast.error('Error updating todo') })
				.finally(() => { setLoading({ ...loading, completed: false }) })
		}
	}

	function handleDelete (todo: Todo): void {
		if (user === null) {
			const storageTodos = Object.values(JSON.parse(localStorage.getItem('todos') ?? '{}'))

			storageTodos.splice(storageTodos.indexOf(todo.id), 1)
			localStorage.setItem('todos', JSON.stringify(storageTodos))
			setTodos(storageTodos as Todo[])
		} else {
			setLoading({ ...loading, delete: true })
			deleteTodo({ id: todo.id, uid: user?.uid ?? '' })
				.catch(() => { toast.error('Error deleting todo') })
				.finally(() => { setLoading({ ...loading, delete: false }) })
		}
	}

	function handleOnDragEnd (result: any): void {
		const items = Array.from(todos)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		setTodos(items)
		if (user === null) {
			localStorage.setItem('todos', JSON.stringify(items))
		}
	}

	if (user === undefined || loading.todos) {
		return (
			<div className='pt-16 px-3  mt-8 text-center'>
				<Image className='m-auto w-10 invert dark:invert-0' src={loader} alt='Loading..' title='Loading...' />
			</div>
		)
	}

	if (todos.length < 1) {
		return (
			<div className='pt-16 px-3  mt-8 text-center'>
				<p>No todos :c</p>
			</div>
		)
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId='characters'>
				{(provided) => (
					<ul className='drag-sort-enable todo-list flex flex-col w-full mt-8' {...provided.droppableProps} ref={provided.innerRef}>
						{todos.map((todo, index) => {
							return (
								<Draggable key={todo.id} draggableId={todo.id + ''} index={index} >
									{(provided) => (
										<li key={todo.id} ref={provided.innerRef} {...provided.draggableProps} className={`flex items-center shadow gap-2 rounded px-6 py-3 mb-2 justify-between transition-colors ${todo.completed ? 'bg-green-500 ' : 'dark:bg-zinc-800 bg-white'}`} id={'todo-' + todo.id}>
											<div className='flex gap-4 w-full items-center'>
												<input type='checkbox'
													className={`cursor-pointer w-6 aspect-square ${loading.completed ? 'opacity-80' : ''}`}
													defaultChecked={todo.completed}
													disabled={loading.completed}
													onChange={() => { handleComplete(todo) }} />
												<p className={`py-2 px-4 w-full ${todo.completed ? 'line-through' : ''}`} >{todo.text}</p>
											</div>
											<div className='flex gap-2 min-w-fit'>
												<button
													className={`px-2 py-2 rounded transition-all group hover:scale-105 hover:bg-red-600 ${loading.delete ? 'opacity-80' : ''}`}
													disabled={loading.delete}
													onClick={() => { handleDelete(todo) }}>
													<Image src={deleteIcon} alt='Delete' width={24} height={24} className='dark:invert group-hover:invert transition-all ' />
												</button>
												<div {...provided.dragHandleProps} className='px-2 py-2 rounded transition-all hover:opacity-60'>
													<Image src={reorderIcon} alt='Reorder' width={24} height={24} className='dark:invert' id='reorder' />
												</div>
											</div>
										</li>
									)}
								</Draggable>
							)
						})}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	)
}
