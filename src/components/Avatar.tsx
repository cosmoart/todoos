import Image from 'next/image'
import { loginWithGithub, logout } from '../../firebase/client'
import useUser from '@/hooks/useUser'
import avatarIMG from '@/assets/images/avatar.svg'
import { toast } from 'sonner'

export default function Avatar (): JSX.Element {
	const user = useUser()

	async function handleLogin (): Promise<any> {
		loginWithGithub()
			.catch(() => toast.error('Error trying to login with Github'))
		return null
	}

	if (user === undefined) {
		return (
			<div className='flex gap-4 items-center'>
				<div className='w-12 aspect-square rounded-full bg-white shimmerBG' />
				<div className='flex flex-col gap-1 items-start'>
					<strong className='text-xl font-bold tracking-wide shimmerBG rounded px-2 text-transparent select-none'>Loading</strong>
					<div className='bg-whiteshadow  py-1 text-xs px-4 rounded text-transparent shimmerBG select-none'>
						Loading
					</div>
				</div>
			</div>
		)
	}

	if (user === null) {
		return (
			<div className='flex gap-4 items-center'>
				<Image src={avatarIMG} alt='avatar' width={48} height={48} className='w-12 aspect-square rounded-full dark:invert' />
				<div className='flex flex-col gap-1 items-start'>
					<strong className='text-xl font-bold tracking-wide'>Offline user</strong>
					<button onClick={() => handleLogin} className='shadow  py-1 text-xs px-4 rounded bg-white text-zinc-900 transition-all'>
						Login
					</button>
				</div>
			</div >
		)
	}

	return (
		<div className='flex gap-4 items-center'>
			<Image src={user.avatar} alt={user.username} width={48} height={48} className='w-12 aspect-square rounded-full' />
			<div className='flex flex-col gap-1 items-start'>
				<strong className='text-xl font-bold tracking-wide'>{user.username}</strong>
				<button onClick={logout} className='shadow bg-white py-1 text-xs px-4 rounded text-black'>
					Logout
				</button>
			</div>
		</div>
	)
}
