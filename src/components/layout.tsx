import DarkModeBtn from '@/components/DarkMode'
import { Inter } from 'next/font/google'
import Navbar from './NavBar'
import Footer from './Footer'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Layout ({ children }: any): JSX.Element {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<div className={`pt-6 text-zinc-900 dark:text-white max-w-5xl mx-auto w-11/12 min-h-screen flex flex-col justify-between ${inter.className}`}>
				<div>
					<Navbar />
					<DarkModeBtn />
					<main>{children}</main>
				</div>
				<Footer />
			</div>
		</>
	)
}
