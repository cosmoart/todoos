import DarkModeBtn from '@/components/DarkMode'
import { Inter } from 'next/font/google'
import Navbar from './NavBar'
import Footer from './Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Layout ({ children }: any): JSX.Element {
	return (
		<div className={`pt-6 text-zinc-900 dark:text-white max-w-5xl mx-auto w-11/12 min-h-screen flex flex-col justify-between ${inter.className}`}>
			<div>
				<Navbar />
				<DarkModeBtn />
				<main>{children}</main>
			</div>
			<Footer />
		</div>
	)
}
