import { logoutAccount } from '@/lib/actions/user.actions';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const Footer = ({user, type='desktop' }: FooterProps) => {
    const router = useRouter();

    const handleLogOut = async () => {
        const loggedOut = await logoutAccount();

        if(loggedOut) router.push('/sign-in');
    }

  return (
    <footer className='footer'>
        <div className={type === 'moblie' ?
        'footer_name-moblie': 'footer_name'}>
            <p className='text-xl font-bold text-gray-700'>
                {user.firstName[0]}
            </p>
        </div>

        <div className={type === 'moblie' ?
        'footer_email-moblie': 'footer_email'}>
            <h1 className='text-14 turncate font-normal text-gray-700 font-semibold'>
                {user.name}
            </h1>
            <p className='text-14 turncate font-normal text-gray-600'>
                {user.email}
            </p>
        </div>

        <div className='footer-image' onClick={handleLogOut}>
            <Image src="/icons/logout.svg" fill alt='jsm'/>
        </div>
    </footer>
  )
}

export default Footer