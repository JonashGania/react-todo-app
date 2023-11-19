import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6"
import Today from './Today'
import Modal from './Modal';

export default function TdTaskForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [todos, setTodos] = useState([
        {
            tasks: 'Learn React',
            date: 'Nov. 25, 2023',
            label: 'Work'
        },
        {
            tasks: 'Study',
            date: 'Nov. 25, 2023',
            label: 'School'
        }
    ]);

    const handleModalOpen = () => {
        setIsOpen(true)
    }

    const handleModalClose = () => {
        setIsOpen(false)
    }

    return (
        <div className='max-w-2xl mx-auto bg-white pt-32'>
            <div className='px-4 flex justify-center flex-col'>
                <h1 className='text-3xl font-bold pb-8'>My Tasks</h1>
                <ul className='w-[500px] flex gap-4 flex-col pb-8'>
                    {todos.map((task, index) => (
                        <Today key={index} todo={task}/>
                    ))}
                </ul>
                {isOpen && <Modal onClose={handleModalClose}/>}
                <button 
                    className='flex items-center gap-2 text-lg px-3 py-3 bg-sky-600 hover:bg-sky-700 rounded-md text-white w-[125px] active:scale-110  transition-all duration-200 ease-in '
                    onClick={handleModalOpen}
                >
                    <FaPlus size={'1.1rem'} color='white'/>
                    Add Task
                </button>
            </div>
        </div>
    )
}
