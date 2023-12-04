import React, { useState } from 'react'
import { LuMail, LuLock  } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem('auth', JSON.stringify(authInfo));
        navigate("/tasks");
    }

    const signWithEmailPass = async(e) => {
        e.preventDefault(e);
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
            navigate("/tasks");
        } catch (error) {
            console.error('Error with signing-in', error);
        }
    }

    return (
        <div className='flex justify-center items-center w-full h-screen'>
            <div className='bg-white rounded-lg px-4 pt-12 pb-4 max-w-md w-full flex justify-between flex-col items-center'>
                <h3 className='text-2xl font-semibold pb-6'>Sign In</h3>
                <form className='max-w-xs w-full' onSubmit={signWithEmailPass}>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex items-center w-full gap-3 px-2 py-2 border border-gray-400 rounded-lg'>
                            <LuMail 
                                size={"1.5rem"}
                                color='#9ca3af'    
                            />
                            <input 
                                type="text" 
                                placeholder='Email'
                                className='outline-none text-gray-600 w-full'
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center w-full gap-3 px-2 py-2 border border-gray-400 rounded-lg'>
                            <LuLock 
                                size={"1.5rem"}
                                color='#9ca3af'    
                            />
                            <input 
                                type="password" 
                                placeholder='Password'
                                className='outline-none text-gray-600 w-full'
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className='mt-5 text-lg px-1 py-2 bg-sky-600 hover:bg-sky-700 rounded-xl text-white'>Sign In</button>
                    </div>
                </form>
                <span className='text-gray-500 py-4'>Or</span>
                <button 
                    className='cursor-pointer hover:bg-[rgba(0,0,0,0.2)] max-w-xs w-full px-2 py-2 rounded-lg flex justify-center transition-all duration-200 ease-in'
                    onClick={signWithGoogle}
                >   
                    <FcGoogle 
                        size={'1.5rem'}
                        className='mr-2'
                    />
                    Login with Google 
                </button>
                <p className='text-sm pt-12'>
                    Don&apos;t have an account?
                    <Link
                        to="/sign-up"
                        className='font-bold pl-2'
                    >
                        Sign up
                    </Link>  
                </p>
            </div>
        </div>
    )
}
