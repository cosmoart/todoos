import { Inter } from 'next/font/google'
import Form from '@/components/Form';
import ListTodos from '@/components/ListTodos';
import Navbar from '@/components/NavBar';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	return (
		<>
			<Head>
				<title>Todoos</title>
			</Head>
			<main className={`p-6 md:px-12 text-zinc-900 dark:text-white ${inter.className}`}>
				<Navbar />
				<Form />
				<div className='grid md:grid-cols-[0.6fr,12px,0.4fr] gap-2 mt-8'>
					<ListTodos />
					<div className='dark:bg-white bg-zinc-800 w-0.5 rounded h-full mx-auto opacity-60'></div>
					<textarea className='dark:bg-zinc-800 w-full rounded resize-y p-3' defaultValue="Hola, esta es una casilla de notas"></textarea>
				</div>
			</main>
		</>
	)
}
