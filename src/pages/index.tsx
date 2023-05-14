import Form from '@/components/Form'
import ListTodos from '@/components/ListTodos'
import Head from 'next/head'
import { Toaster } from 'sonner'

export default function Home (): JSX.Element {
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
