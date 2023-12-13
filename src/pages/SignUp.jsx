import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { IoEyeOffOutline, IoEyeOutline  } from "react-icons/io5";
import { validatePassword, validateEmail } from '../utils/emailPassValidation';


export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passHidden, setPassHidden] = useState(true);
    const [isValidated, setIsValidated] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        switch(id){
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const signUpWithEmailPass = async(e) => {
        e.preventDefault(e);

        setIsValidated(true);
        if(!validatePassword(password)){
            return
        }

        if(!validateEmail(email)){
            return
        }

        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredentials.user, {
                displayName: name,
            })
            setName('');
            setEmail('');
            setPassword('');
            
            navigate('/');
            
        } catch(error){
            console.error('Error Signing-up', error)
        }
    }

    return (
        <div className='flex justify-center items-center w-full h-screen'>
            <div className='rounded-lg px-4 pt-12 pb-4 max-w-[500px] w-full flex justify-center flex-col items-center border border-gray-200'>
                <h3 className='text-2xl font-semibold pb-6'>Sign Up</h3>
                <form 
                    className='max-w-sm w-full' 
                    onSubmit={signUpWithEmailPass}
                >
                    <div className='w-full flex flex-col gap-4'>
                        <input 
                            type="text" 
                            placeholder='Name'
                            className='outline-none text-gray-600 w-full px-2 py-2 border border-gray-400 rounded-lg'
                            id='name'
                            onChange={handleSignUp}
                            required
                            autoComplete='off'
                        />
                        <div>
                            <input 
                                type="text" 
                                placeholder='Email'
                                className='outline-none text-gray-600 w-full px-2 py-2 border border-gray-400 rounded-lg'
                                id='email'
                                onChange={handleSignUp}
                                required
                            />
                            {isValidated && !validateEmail(email) && (
                                <div className='px-3 pt-1'>
                                    <p className='text-red-500 text-sm font-medium'>* Please enter a valid email address</p>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className='flex items-center px-2 py-2 border border-gray-400 rounded-lg'>
                                <input 
                                    type={passHidden ? 'password' : 'text'}
                                    placeholder='Password'
                                    className='outline-none text-gray-600 w-full'
                                    id='password'
                                    onChange={handleSignUp}
                                    required
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
                            {isValidated && !validatePassword(password) && (
                                <div className='px-3 pt-1'>
                                    <p className='text-red-500 text-sm font-medium'>* Password must contain at least 8 characters, Capital, Lower, and Numbers</p>
                                </div>
                            )}
                        </div>
                        <button className='mt-5 text-lg px-1 py-2 bg-[#1B1C3B] hover:bg-[#22234b] rounded-xl text-white  transition-all duration-200 ease-in'>Sign Up</button>
                    </div>
                </form>
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
