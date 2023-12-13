import React, { useState } from 'react'
import { LuMail, LuLock  } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { IoEyeOffOutline, IoEyeOutline  } from "react-icons/io5";

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passHidden, setPassHidden] = useState(true);
    const [incorrectEmailPass, setIncorrectEmailPass] = useState(false);

    const signWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            isAuth: true,
        }
        localStorage.setItem('auth', JSON.stringify(authInfo));
        navigate("/tasks");
    }

    const signWithEmailPass = async(e) => {
        e.preventDefault(e);
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const userInfo = {
                userID: userCredentials.user.uid,
                isAuth: true,
            }
            localStorage.setItem('auth', JSON.stringify(userInfo));
            setIncorrectEmailPass(false);
            navigate("/tasks");
        } catch (error) {
            console.error('Error with signing-in', error);
            setIncorrectEmailPass(true);
        }
    }


    return (
        <div className='flex justify-center items-center w-full h-screen'>
            <div className='rounded-md px-4 pt-12 pb-4 max-w-[500px] w-full flex justify-between flex-col items-center border border-gray-200'>
                <h3 className='text-2xl font-semibold pb-6'>Sign In</h3>
                {incorrectEmailPass && (
                    <div className='pb-5'>
                        <p className='text-red-500 font-medium text-sm'>Your email or password maybe incorrect.</p>
                    </div>
                )}
                <form className='max-w-sm w-full' onSubmit={signWithEmailPass}>
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
                                type={passHidden ? 'password' : 'text'}
                                placeholder='Password'
                                className='outline-none text-gray-600 w-full'
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type='button' onClick={() => setPassHidden(!passHidden)}>
                                {passHidden ? (
                                    <IoEyeOffOutline 
                                        size={'1.2rem'}
                                        color='rgb(75, 85, 99)'
                                    />
                                ) : (
                                    <IoEyeOutline 
                                        size={'1.2rem'}
                                        color='rgb(75, 85, 99)'
                                    /> 
                                )}
                            </button>
                        </div>
                        <button className='mt-5 text-lg px-1 py-2 bg-[#1B1C3B] hover:bg-[#22234b] rounded-xl text-white'>Sign In</button>
                    </div>
                </form>
                <span className='text-gray-500 py-4'>Or</span>
                <button
                    className='cursor-pointer hover:bg-[rgba(0,0,0,0.2)] max-w-sm w-full px-2 py-2 rounded-lg flex justify-center transition-all duration-200 ease-in'
                    onClick={signWithGoogle}
                >   
                    <FcGoogle 
                        size={'1.5rem'}
                        className='mr-2'
                    />
                    Continue with Google 
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
