import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";
import { RotatingLines } from  'react-loader-spinner'


export default function Modal({ onClose, isOpen }) {
    const [taskTitle, setTaskTitle] = useState('');
    const [date, setDate] = useState('');
    const [label, setLabel] = useState('Home');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        switch(id){
            case 'title':
                setTaskTitle(value)
                break;
            case 'date':
                setDate(value)
                break;
            case 'label':
                setLabel(value)
                break;
            default:
                break;
        }
    }

    const createTodo = async(e) => {
        e.preventDefault(e);
        setIsLoading(true);

        try{
            const user = auth.currentUser

            if(!user){
                return
            }

            const formattedDate = format(new Date(date), "MMM. dd, yyyy");

            await addDoc(collection(db, 'todos'), {
                task: taskTitle,
                date: formattedDate,
                label: label,
                completed: false,
                userId: user.uid,
            })

            setTaskTitle('');
            setDate('');
            setLabel('');
            onClose();
        } catch(error){
            console.error('Error creating task', error)
        } finally {
            setIsLoading(false);
        }
       
    }


    return (
        <div className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center ${isOpen ? 'visible bg-[rgba(0,0,0,0.5)]' : 'invisible'}`}>
            <div className={`bg-white mx-4 px-4 py-4 max-w-[700px] w-full rounded-md transition-all ease-in duration-200 ${isOpen ? 'translate-y-[0%] opacity-100' : 'translate-y-[-20%] opacity-0'}`}>
                <div className='flex justify-end'>
                    <div className='cursor-pointer' onClick={onClose}>
                        <IoClose 
                            size={"1.7rem"}
                            color='#4b5563'    
                        />
                    </div>
                </div>
                {isLoading ? (
                    <div className='grid place-items-center'>
                        <div className='sm:block hidden'>
                            <RotatingLines 
                                strokeColor="rgb(21,128,61)"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="70"
                                visible={true}
                            />
                        </div>
                        <div className='sm:hidden block'>
                            <RotatingLines 
                                strokeColor="rgb(21,128,61)"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="50"
                                visible={true}
                            />
                        </div>

                    </div>
                ) : (
                    <form onSubmit={createTodo}>
                        <div className='flex gap-8 flex-wrap sm:flex-nowrap'>
                            <div className='sm:w-[50%] w-full flex gap-4 flex-col'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="title" className='font-medium'>Title:</label>
                                    <input 
                                        type="text" 
                                        id='title'
                                        className='border border-gray-400 px-2 py-2 rounded-md outline-none'
                                        value={taskTitle}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="date" className='font-medium'>Date:</label>
                                    <input 
                                        type="date" 
                                        id='date'
                                        className='border border-gray-400 px-2 py-2 rounded-md outline-none'  
                                        value={date}  
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='sm:w-[50%] w-full flex gap-4 flex-col'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="label" className='font-medium'>Label:</label>
                                    <select 
                                        id="label"
                                        className='border border-gray-400 px-2 py-2 rounded-md outline-none'
                                        value={label}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Home">Home</option>
                                        <option value="Study">Study</option>
                                        <option value="Work">Work</option>
                                        <option value="Personal">Personal</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end pt-8'>
                            <button 
                                className='px-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md'
                            >Add Task
                            </button>
                        </div>
                    </form>
                )}
            </div>      
        </div>
    )
}


Modal.propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
}