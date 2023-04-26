import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="shortcut icon" href="favicon.svg" type="image/svg+xml" />
				<meta name="description" content="TODO" />
				<meta name="robots" content="index, follow" />

				{/* <!-- Facebook Meta Tags --> */}
				<meta property="og:url" content="https://todoos.vercel.app" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Todoos" />
				<meta property="og:description" content="TODO" />
				<meta property="og:image" content="TODO" />

				{/* <!-- Twitter Meta Tags --> */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="todoos.vercel.app" />
				<meta property="twitter:url" content="https://todoos.vercel.app" />
				<meta name="twitter:title" content="Todoos" />
				<meta name="twitter:description" content="TODO" />
				<meta name="twitter:image" content="TODO" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}