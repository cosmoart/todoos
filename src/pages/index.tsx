import { Inter } from 'next/font/google'
import Form from '@/components/Form'
import ListTodos from '@/components/ListTodos'
import Navbar from '@/components/NavBar'
import Head from 'next/head'
import { Toaster } from 'sonner'
import Footer from '@/components/Footer'
import DarkModeBtn from '@/components/DarkMode'

const inter = Inter({ subsets: ['latin'] })

export default function Home (): JSX.Element {
	return (
		<>
			<Head>
				<title>Todoos</title>
			</Head>
			<Toaster position='bottom-right' richColors />
			<div className={`pt-6 text-zinc-900 dark:text-white max-w-5xl mx-auto w-11/12 ${inter.className}`}>
				<Navbar />
				<Form />
				<ListTodos />
				<Footer />
				<DarkModeBtn />
			</div>
		</>
	)
}
