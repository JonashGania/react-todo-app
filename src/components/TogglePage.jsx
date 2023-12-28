import { NavLink } from 'react-router-dom'

export default function TogglePage() {
  return (
    <div className='w-full h-16 pb-20 pt-10 flex items-center justify-center gap-14 sm:gap-20 px-4 transition-all duration-300 ease-in'>
        <NavLink
            to='/tasks'
            className='text-black text-lg sm:text-2xl font-semibold px-3 relative transition-all duration-300 ease-in'
        >
            My Tasks
        </NavLink>
        <NavLink
            to='/pomodoro'
            className='text-black text-lg sm:text-2xl font-semibold px-3 relative transition-all duration-300 ease-in'
        >
            Pomodoro
        </NavLink>
    </div>
  )
}
