import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useGetUserInfo from '../hooks/UseGetUserInfo'
import SignOut from './SignOut';
import Dropdown from './Dropdown';
import { IoChevronDownOutline } from "react-icons/io5";


export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { name, profilePhoto } = useGetUserInfo();

    const handleDropdownOpen = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(true)
    }

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    }

    return (
        <header className='max-w-4xl mx-auto'>
            <div className='py-4 flex justify-end items-center relative'>
                <button 
                    onClick={handleDropdownOpen}
                    className={`flex items-center gap-2 cursor-default justify-end py-1 px-1 rounded-3xl transition-all duration-100 ease-in group ${isDropdownOpen ? 'bg-sky-700 hover:bg-sky-700' : 'bg-[rgb(25,38,49)] hover:bg-black'}`}
                >
                    {profilePhoto ? (
                        <img 
                            src={profilePhoto} 
                            alt="Avatar" 
                            className='rounded-[50%] w-7'    
                        />
                    ) : (
                        <img 
                            src="/profile.png" 
                            alt="Avatar" 
                            className='rounded-[50%] w-7'
                        />
                    )}
                    <IoChevronDownOutline
                        color='white'
                        size='1rem'
                        className={`group-hover:translate-y-1 duration-100 transition ease-in ${isDropdownOpen ? 'translate-y-1' : ''}`}
                    />
                </button>
                {isDropdownOpen && <Dropdown name={name} profilePhoto={profilePhoto} onClose={handleDropdownClose}/>}
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
