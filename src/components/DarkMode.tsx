import { useEffect, useState } from 'react'
import LightIcon from '@/assets/icons/light.svg'
import DarkIcon from '@/assets/icons/dark.svg'
import Image from 'next/image'

export default function DarkModeBtn (): JSX.Element {
	const [darkMode, setDarkMode] = useState(true)

	useEffect(() => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			setDarkMode(true)
		} else setDarkMode(false)
	}, [])

	useEffect(() => {
		document.documentElement.classList[darkMode ? 'add' : 'remove']('dark')
		localStorage.theme = darkMode ? 'dark' : 'light'
	}, [darkMode])

	return (
		<button
			className='absolute top-0 right-0 p-4'
			onClick={() => { setDarkMode(!darkMode) }}
		>
			{darkMode
				? <Image src={LightIcon} alt='Light mode icon' width={22} height={22} className='dark:invert transition-all duration-400 hover:rotate-90 hover:scale-105' />
				: <Image src={DarkIcon} alt='Dark mode icon' width={22} height={22} className='dark:invert  hover:scale-105' />
			}
		</button>
	)
}
