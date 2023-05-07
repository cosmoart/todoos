import Image from 'next/image'
import { loginWithGithub, logout } from '../../firebase/client'
import useUser from '@/hooks/useUser'

export default function Avatar(): JSX.Element {
	const user = useUser()

	function handleLogin() {
		loginWithGithub()
		// .catch(err => TODO: handle error)
	}

	if (user === undefined) return (
		<div className='flex gap-4 items-center'>
			<div className='w-12 aspect-square rounded-full bg-white' />
			{/* <Image src="" alt="" width={48} height={48} className='w-12 aspect-square rounded-full' /> */}
			<div className='flex flex-col gap-1'>
				<strong className="text-xl font-bold tracking-wide">Loading</strong>
				<button className='bg-white py-1 text-xs px-3 rounded text-black'>
					Loading
				</button>
			</div>
		</div>
	)

	if (user === null) return (
		<div className='flex gap-4 items-center'>
			<div className='w-12 aspect-square rounded-full bg-white dark:bg-zinc-800' />
			{/* <Image src="" alt="" width={48} height={48} className='w-12 aspect-square rounded-full' /> */}
			<div className='flex flex-col gap-1'>
				<strong className="text-xl font-bold tracking-wide">Invitado</strong>
				<button onClick={handleLogin} className=' py-1 text-xs px-3 rounded bg-white text-zinc-900 transition-all'>
					Login
				</button>
			</div>
		</div>
	)

	return (
		<div className='flex gap-4 items-center'>
			<Image src={user.avatar} alt={user.username} width={48} height={48} className='w-12 aspect-square rounded-full' />
			<div className='flex flex-col gap-1'>
				<strong className="text-xl font-bold tracking-wide">{user.username}</strong>
				<button onClick={logout} className='bg-white py-1 text-xs px-3 rounded text-black'>
					Logout
				</button>
			</div>
		</div>
	)

}
