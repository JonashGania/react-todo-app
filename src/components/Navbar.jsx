import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useGetUserInfo from '../hooks/UseGetUserInfo'
import Dropdown from './Dropdown';
import { IoChevronDownOutline } from "react-icons/io5";


export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userInfo = useGetUserInfo();

    const handleDropdownOpen = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(true)
    }

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    }

    return (
        <header className='w-full bg-green-700'>
            <nav className='max-w-4xl mx-auto flex items-center justify-between py-2'>
                <div className='flex items-center gap-2'>
                    <img src="/logo.png" alt="logo" className=' w-12'/>
                    <p className='text-lg text-white font-medium'>PomoTask</p>
                </div>
                <div className='py-2 flex justify-end items-center relative'>
                    <button 
                        onClick={handleDropdownOpen}
                        className={`flex items-center gap-2 cursor-default justify-end py-1 px-1 rounded-3xl transition-all duration-100 ease-in group ${isDropdownOpen ? 'bg-black hover:bg-black' : 'bg-[#ffffff8c] hover:bg-black'}`}
                    >
                        {userInfo?.photoURL ? (
                            <img 
                                src={userInfo.photoURL} 
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
                    {isDropdownOpen && <Dropdown name={userInfo.name} profilePhoto={userInfo.photoURL} onClose={handleDropdownClose}/>}
                </div>
                
            </nav>
        </header>
    )
}
