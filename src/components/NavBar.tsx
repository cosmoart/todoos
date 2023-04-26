import Avatar from './Avatar';

export default function Navbar() {
	return (
		<header className='flex justify-between items-center mb-6'>
			<h1 className='font-bold text-3xl'>Todoos</h1>
			<Avatar />
		</header>
	)
}