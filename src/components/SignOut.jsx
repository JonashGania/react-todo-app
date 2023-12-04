import React from 'react'
import { signOut } from 'firebase/auth'
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';


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
            className='flex items-center gap-2 group' 
            onClick={handleSignOut}
        >
            <p className='text-white font-medium'>Sign Out</p>
            <MdOutlineLogout 
                color='white'
                size='1.3rem'
                className=' group-hover:translate-x-2 transition duration-100 ease-in'
            />
        </button>
    )
}
