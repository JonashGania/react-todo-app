import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useGetUserInfo from '../hooks/UseGetUserInfo'
import SignOut from './SignOut';

export default function Navbar() {
    const { name, profilePhoto } = useGetUserInfo();

    return (
        <header className='max-w-4xl mx-auto'>
            <div className='py-4 flex justify-between items-center gap-4'>
                <div className='flex items-center gap-4'>
                    <img 
                        src={profilePhoto} 
                        alt="Avatar" 
                        className='rounded-[50%] w-10'    
                    />
                    <h3 className='text-white font-semibold text-xl'>{name}</h3>
                </div>
                <SignOut />
            </div>
            <nav className='w-full h-16 pb-20 pt-10 flex items-center justify-center gap-20'>
                <NavLink
                    to='/tasks'
                    className='text-white text-2xl font-semibold px-3 relative'
                >
                    My Tasks
                </NavLink>
                <NavLink
                    to='/pomodoro'
                    className='text-white text-2xl font-semibold px-3 relative'
                >
                    Pomodoro
                </NavLink>
            </nav>
        </header>
    )
}
