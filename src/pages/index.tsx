import Form from '@/components/Form'
import ListTodos from '@/components/ListTodos'
import Head from 'next/head'
import { Toaster } from 'sonner'
import { useEffect } from 'react'

export default function Home (): JSX.Element {
	useEffect(() => {
		void navigator.serviceWorker.register('/service-worker.js')
	}, [])

	return (
		<>
			<Head>
				<title>Todoos</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<Toaster position='bottom-right' richColors />
			<Form />
			<ListTodos />
		</>
	)
}
