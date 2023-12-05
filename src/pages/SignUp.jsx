import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';


export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            <div className='bg-white rounded-lg px-4 pt-12 pb-4 max-w-md w-full flex justify-center flex-col items-center'>
                <h3 className='text-2xl font-semibold pb-6'>Sign Up</h3>
                <form 
                    className='max-w-xs w-full' 
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
                        <input 
                            type="text" 
                            placeholder='Email'
                            className='outline-none text-gray-600 w-full px-2 py-2 border border-gray-400 rounded-lg'
                            id='email'
                            onChange={handleSignUp}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder='Password'
                            className='outline-none text-gray-600 w-full px-2 py-2 border border-gray-400 rounded-lg'
                            id='password'
                            onChange={handleSignUp}
                            required
                       />
                        <button className='mt-5 text-lg px-1 py-2 bg-sky-600 hover:bg-sky-700 rounded-xl text-white  transition-all duration-200 ease-in'>Sign Up</button>
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
