import React from 'react'
import { Link } from 'react-router-dom'
import { FaTasks } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";

export default function Navbar() {
  return (
    <header className='max-w-2xl mx-auto'>
        <nav className='w-full h-32 flex items-center justify-center gap-20'>
            <Link
                to='/tasks'
                className='border-[3px] border-sky-500 rounded-[50%] w-16 h-16 hover:px-[2px] hover:py-[2px] duration-100 transition-all ease-in flex items-center justify-center'
            >
                <div className='w-full h-full flex items-center justify-center rounded-[50%] bg-gray-200'>
                    <FaTasks 
                        size='2.3rem'
                        color='rgb(2,132,199)'
                    />
                </div>
            </Link>
            <Link
                to='/pomodoro'
                className='border-[3px] border-sky-500 rounded-[50%] w-16 h-16 hover:px-[2px] hover:py-[2px] duration-100 transition-all ease-in flex items-center justify-center'
            >
                <div className='w-full h-full flex items-center justify-center rounded-[50%] bg-gray-200'>
                    <IoIosTimer 
                        size='2.5rem'
                        color='rgb(2,132,199)'
                    />
                </div>
            </Link>
        </nav>
    </header>
  )
}
