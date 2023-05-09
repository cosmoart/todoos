import { useState } from 'react'
import { addTodo } from '../../firebase/client'
import useUser from '@/hooks/useUser'
import { toast } from 'sonner'

const todosPlaceholders = [
	'Learn React',
	'Wach the invisible dog',
	'Learn how to play the guitar',
	'Look into the abyss',
	'Watch Transformers 3'
]
const todoPlaceholder = todosPlaceholders[Math.floor(Math.random() * todosPlaceholders.length)]

export default function Form (): JSX.Element {
	const user = useUser()
	const [text, setText] = useState<string>(todoPlaceholder)
	const [loading, setLoading] = useState(false)

	function handleSubmit (e: any): void {
		e.preventDefault()

		if (user === null) {
			const storageTodos = JSON.parse(localStorage.getItem('todos') ?? '{}')

			localStorage.setItem('todos', JSON.stringify({
				...storageTodos,
				[Object.keys(storageTodos).length]: {
					text: e.target[0].value,
					completed: false,
					id: Object.keys(storageTodos).length
				}
			}))
		} else {
			setLoading(true)
			addTodo({
				todo: {
					text: e.target[0].value,
					completed: false
				},
				uid: user?.uid ?? 'null'
			})
				.catch(() => toast.error('Error adding todo'))
				.finally(() => { setLoading(false) })
		}
	}

	const disableBtns = text.length < 1 || loading || user === undefined

	return (
		<form onSubmit={handleSubmit} className='flex gap-2 flex-col md:flex-row'>
			<div className='flex gap-2 w-full'>
				<input defaultValue={text} className='px-5 py-2 dark:bg-zinc-800 w-full shadow rounded' type='text' placeholder='Write a task to add' onChange={e => { setText(e.target.value) }} />
				<button className={`bg-white shadow text-black px-5 py-2 md:px-10 rounded hover:scale-x-105 transition-transform ${disableBtns ? 'cursor-not-allowed opacity-80' : ''}`} type='submit' disabled={disableBtns}>
					Add
				</button>
			</div>
			<select name='orderType' className='dark:bg-zinc-800 shadow bg-white rounded px-3 py-2'>
				<option value='all'>All</option>
				<option value='completed'>Completed</option>
				<option value='uncompleted'>Uncompleted</option>
			</select>
		</form>
	)
}
