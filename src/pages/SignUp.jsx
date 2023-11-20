import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='bg-white rounded-lg px-4 pt-12 pb-4 max-w-md w-full flex justify-center flex-col items-center'>
            <h3 className='text-2xl font-semibold pb-6'>Sign Up</h3>
            <div className='max-w-xs w-full flex flex-col gap-4'>
                <input 
                    type="text" 
                    placeholder='Full name'
                    className='outline-none text-gray-600 w-full px-2 py-2 border border-gray-400 rounded-lg'
                />
                <input 
                    type="text" 
                    placeholder='Email'
                    className='outline-none text-gray-600 w-full px-2 py-2 border border-gray-400 rounded-lg'
                />
                <input 
                    type="password" 
                    placeholder='Password'
                    className='outline-none text-gray-600 w-full px-2 py-2 border border-gray-400 rounded-lg'
                />
                <button className='mt-5 text-lg px-1 py-2 bg-sky-600 hover:bg-sky-700 rounded-xl text-white active:scale-110  transition-all duration-200 ease-in'>Sign Up</button>
            </div>
            <p className='text-sm pt-12'>
                Already have an account?
                <Link
                    to="/"
                    className='font-bold pl-2'
                >
                    Sign in
                </Link>  
            </p>
        </div>
    </div>
  )
}
