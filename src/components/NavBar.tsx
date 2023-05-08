import Avatar from './Avatar'

export default function Navbar (): JSX.Element {
	return (
		<header className='flex justify-between items-center mb-6 pb-5 pt-3'>
			<h1 className='font-bold text-3xl'>Todoos</h1>
			<Avatar />
		</header>
	)
}
