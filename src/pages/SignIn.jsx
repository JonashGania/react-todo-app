import React from 'react'
import { LuMail, LuLock  } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='bg-white rounded-lg px-4 pt-12 pb-4 max-w-md w-full flex justify-between flex-col items-center'>
            <h3 className='text-2xl font-semibold pb-6'>Sign In</h3>
            <div className='max-w-xs w-full flex flex-col gap-4'>
                <div className='flex items-center w-full gap-3 px-2 py-2 border border-gray-400 rounded-lg'>
                    <LuMail 
                        size={"1.5rem"}
                        color='#9ca3af'    
                    />
                    <input 
                        type="text" 
                        placeholder='Email'
                        className='outline-none text-gray-600 w-full'
                    />
                </div>
                <div className='flex items-center w-full gap-3 px-2 py-2 border border-gray-400 rounded-lg'>
                    <LuLock 
                        size={"1.5rem"}
                        color='#9ca3af'    
                    />
                    <input 
                        type="text" 
                        placeholder='Password'
                        className='outline-none text-gray-600 w-full'
                    />
                </div>
                <button className='mt-5 text-lg px-1 py-2 bg-sky-600 hover:bg-sky-700 rounded-xl text-white active:scale-110  transition-all duration-200 ease-in'>Sign In</button>
            </div>
            <span className='text-gray-500 py-4'>Or</span>
            <button className='cursor-pointer hover:bg-gray-300 max-w-xs w-full px-2 py-2 rounded-lg flex justify-center transition-all duration-200 ease-in'>
                <FcGoogle size={'1.7rem'}/>
            </button>
            <p className='text-sm pt-12'>
                Don&apos;t have an account?  
                <span className='font-bold'> Sign Up</span>
            </p>
        </div>
    </div>
  )
}