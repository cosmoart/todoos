import { useState } from 'react';
import { addTodo } from '../../firebase/client';
import useUser from '@/hooks/useUser';

const todosPlaceholders = [
	"Learn React",
	"Wach the invisible dog",
	"Learn how to play the guitar",
	"Look into the abyss",
	"Watch Transformers 3",
]

export default function Form(): JSX.Element {
	const user = useUser()
	const [text, setText] = useState(todosPlaceholders[Math.floor(Math.random() * todosPlaceholders.length)]);
	const [loading, setLoading] = useState(false);

	function handleSubmit(e: any) {
		e.preventDefault();

		if (user === null) {
			const storageTodos = JSON.parse(localStorage.getItem("todos") || "{}")

			localStorage.setItem("todos", JSON.stringify({
				...storageTodos, [Object.keys(storageTodos).length]: {
					text: e.target[0].value,
					completed: false,
					id: Object.keys(storageTodos).length
				}
			}))

		} else {
			setLoading(true);
			addTodo({
				todo: {
					text: e.target[0].value,
					completed: false,
				},
				uid: user?.uid || "null"
			})
				.catch(() => {
					// TODO
				})
				.finally(() => {
					setLoading(false);
				})
		}
	}

	const disableBtns = !text.length || loading || user === undefined

	return (
		<form onSubmit={handleSubmit} className='flex gap-1'>
			<input defaultValue={text} className='px-5 py-2 dark:bg-zinc-800 w-full max-w-lg' type="text" placeholder="Write a task to add" onChange={e => setText(e.target.value)} />
			<button className={`mx-4 bg-white text-black px-5 py-2 hover:scale-x-105 transition-transform ${disableBtns ? "cursor-not-allowed opacity-80" : ""}`} type="submit" disabled={disableBtns}>
				{
					loading ? "Adding..." : "Add"
				}
			</button>
		</form>
	)
}