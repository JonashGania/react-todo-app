import React from 'react'
import { Link, NavLink } from 'react-router-dom'


export default function Navbar() {
  return (
    <header className='max-w-2xl mx-auto'>
        <nav className='w-full h-32 flex items-center justify-center gap-20'>
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
