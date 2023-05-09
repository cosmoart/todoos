import externalIcon from '@/assets/icons/externalLink.svg'
import Image from 'next/image'

export default function Footer (): JSX.Element {
	return (
		<footer className=''>
			<p className='text-center text-xs dark:opacity-70 pt-3'>
				Made with ❤️ by <a href='https://github.com/cosmoart' target='_blank' rel='noopener noreferrer' className='underline'>Cosmo</a> - <a href='https://github.com/cosmoart/todoos' target='_blank' rel='noopener noreferrer' className='underline'>Source code (MIT) <Image src={externalIcon} alt='external link' className='inline dark:invert w-4' /></a>
			</p>
		</footer>
	)
}
