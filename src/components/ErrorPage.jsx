import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ErrorPage() {
    const { userUid } = useAuth();
    const navigate = useNavigate();
    const localAuthInfo = JSON.parse(localStorage.getItem('auth'));

    const handleNavigate = () => {
        if(userUid || (localAuthInfo && localAuthInfo.isAuth)){
            navigate("/tasks")
        } else {
            navigate('/')
        }
    }

    return (
        <div className='errorPage w-full h-screen relative'>
            <div className='w-full h-full flex items-center justify-center flex-col'>
                <p className='text-3xl font-semibold text-gray-800'>So sorry,</p>
                <p className='text-3xl font-semibold text-gray-800'>We couldn&apos;t find what you were looking for.</p>
                <div className='pt-6'>
                    <button 
                        className='flex items-center gap-2 bg-green-500 py-2 px-4 rounded-2xl cursor-pointer'
                        onClick={handleNavigate}    
                    >
                        <p className='text-white'>Back to the homepage</p>
                        <FaArrowRightLong color='white'/>
                    </button>
                </div>
            </div>
        </div>
    )
}
