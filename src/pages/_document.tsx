import { Html, Head, Main, NextScript } from 'next/document'

export default function Document (): JSX.Element {
	return (
		<Html lang='en'>
			<Head>
				<meta charSet='UTF-8' />
				<link rel='shortcut icon' href='favicon.svg' type='image/svg+xml' />
				<meta name='description' content='A to-dos app for save and organize your tasks. You can use it without register.' />
				<meta name='robots' content='index, follow' />

				{/* <!-- Facebook Meta Tags --> */}
				<meta property='og:url' content='https://todoos.vercel.app' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Todoos' />
				<meta property='og:description' content='A to-dos app for save and organize your tasks. You can use it without register.' />
				<meta property='og:image' content='TODO' />

				{/* <!-- Twitter Meta Tags --> */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='todoos.vercel.app' />
				<meta property='twitter:url' content='https://todoos.vercel.app' />
				<meta name='twitter:title' content='Todoos' />
				<meta name='twitter:description' content='A to-dos app for save and organize your tasks. You can use it without register.' />
				<meta name='twitter:image' content='TODO' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
