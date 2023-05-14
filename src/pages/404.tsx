import Head from 'next/head'
import Link from 'next/link'

export default function NotFound (): JSX.Element {
	return (
		<>
			<Head>
				<title>Todoos - 404 Page not Found</title>
			</Head>
			<div className='flex flex-col items-center justify-center h-full'>
				<h1 className='text-4xl font-bold'>404</h1>
				<p className='text-xl'>Page not found</p>
				<Link href='/' className='text-blue-500 hover:underline'>
					Go back home
				</Link>
			</div>
		</>
	)
}
