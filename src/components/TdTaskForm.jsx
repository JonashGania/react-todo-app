import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6"
import Today from './Today'
import Modal from './Modal';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function TdTaskForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'todos'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((document) => {
                todosArr.push({...document.data(), id: document.id})
            })
            setTodos(todosArr);
        })

        return () => unsubscribe();
    }, [])

    console.log(todos);

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
