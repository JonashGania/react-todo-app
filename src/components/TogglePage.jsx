import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TogglePage() {
  return (
    <div className='w-full h-16 pb-20 pt-10 flex items-center justify-center gap-20'>
        <NavLink
            to='/tasks'
            className='text-black text-2xl font-semibold px-3 relative'
        >
            My Tasks
        </NavLink>
        <NavLink
            to='/pomodoro'
            className='text-black text-2xl font-semibold px-3 relative'
        >
            Pomodoro
        </NavLink>
    </div>
  )
}
