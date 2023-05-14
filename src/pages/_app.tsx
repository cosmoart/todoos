import '@/styles/globals.css'
import Layout from '@/components/layout'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
	useEffect(() => {
		if (navigator.serviceWorker) {
			navigator.serviceWorker.register('/sw.js')
				.then(() => { console.log('Service Worker Registered') })
				.catch((err) => { console.log('Service Worker Failed to Register', err) })
		}
	}, [])

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
