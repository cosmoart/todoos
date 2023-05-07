import { useEffect, useState } from 'react'
import { listenAllTodos } from '../../firebase/client';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useUser from '@/hooks/useUser';

import Image from 'next/image';
import deleteIcon from "@/assets/icons/delete.svg"
import reorderIcon from "@/assets/icons/reorder.svg"

import { deleteTodo } from '../../firebase/client';
import { updateTodo } from '../../firebase/client';

export default function ListTodos(): JSX.Element {
	const [loading, setLoading] = useState({ todos: true, delete: false, completed: false });
	const user = useUser()
	type Todo = {
		id: string,
		text: string,
		completed: boolean
	}
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		setLoading({ ...loading, todos: true })
		if (user) {
			listenAllTodos(user.uid, setTodos)
				.finally(() => setLoading({ ...loading, todos: false }))
		}
		if (user === null) {
			setTodos(Object.values(JSON.parse(localStorage.getItem("todos") || "{}")))
			setLoading({ ...loading, todos: false })
		}

	}, [user]);

	function handleComplete(todo: any) {
		if (user === null) {

		} else {
			setLoading({ ...loading, completed: true })
			updateTodo({ id: todo.id, uid: user?.uid || "", todo: { ...todo, completed: !todo.completed } })
				.finally(() => setLoading({ ...loading, completed: false }))
		}
	}

	function handleDelete(todo: any) {
		if (user === null) {

		} else {
			setLoading({ ...loading, delete: true })
			deleteTodo({ id: todo.id, uid: user?.uid || "" })
				.finally(() => setLoading({ ...loading, delete: false }))
		}
	}

	if (user === undefined || loading.todos) return (
		<div className='pt-16 px-3 text-center'>
			<p>Loading...</p>
		</div>
	)

	if (todos.length < 1) return (
		<div className='pt-16 px-3 text-center'>
			<p>No todos :c</p>
		</div>
	)

	function handleOnDragEnd(result: any) {
		if (!result.destination) return;

		const items = Array.from(todos);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setTodos(items);
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="characters">
				{(provided) => (
					<ul className="drag-sort-enable todo-list flex flex-col gap-2 w-full" {...provided.droppableProps} ref={provided.innerRef}>
						{todos.map((todo, index) => {
							return (
								<Draggable key={todo.id} draggableId={todo.id + ""} index={index} >
									{(provided) => (
										<li key={todo.id} ref={provided.innerRef} {...provided.draggableProps} className={`flex items-center gap-2 rounded px-6 py-3 justify-between transition-colors ${todo.completed ? "bg-green-500 " : "dark:bg-zinc-800 bg-white"}`} id={"todo-" + todo.id}>
											<div className='flex gap-4 w-full'>
												<input type="checkbox"
													className={`cursor-pointer w-6 aspect-square ${loading.completed ? "opacity-80" : ""}`}
													defaultChecked={todo.completed}
													disabled={loading.completed}
													onChange={() => handleComplete(todo)} />
												<p className={`py-2 px-4 w-full ${todo.completed ? "line-through" : ""}`} >{todo.text}</p>
											</div>
											<div className='flex gap-2 min-w-fit'>
												<button
													className={`px-2 py-2 rounded transition-all group hover:scale-105 hover:bg-red-600 ${loading.delete ? "opacity-80" : ""}`}
													disabled={loading.delete}
													onClick={() => handleDelete(todo)}>
													<Image src={deleteIcon} alt="Delete" width={24} height={24} className='dark:invert group-hover:invert transition-all ' />
												</button>
												<div {...provided.dragHandleProps} className='px-2 py-2 rounded transition-all hover:opacity-60'>
													<Image src={reorderIcon} alt="Reorder" width={24} height={24} className='dark:invert' id='reorder' />
												</div>
											</div>
										</li>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	)
}