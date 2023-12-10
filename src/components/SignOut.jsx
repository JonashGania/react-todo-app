import React from 'react'
import { signOut } from 'firebase/auth'
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';


export default function SignOut() {
    const navigate = useNavigate();

    const handleSignOut = async() => {
        try{
            await signOut(auth);
            localStorage.removeItem('auth');
            navigate('/');
        } catch (error){
            console.error('Error signing-out', error)
        }
    }

    return (
        <button 
            className='flex items-center gap-2 text-gray-200' 
            onClick={handleSignOut}
        >
            <MdOutlineLogout 
                color='rgb(107, 114, 128)'
                size='1.2rem'
            />
            <p className='text-gray-500 font-medium text-sm '>Sign Out</p>
        </button>
    )
}
