import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6"
import Today from '../components/RenderTasks'
import Modal from '../components/Modal'
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';


export default function Tasks() {
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

    const toggleComplete = async(todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        })
    }

    const deleteTodo = async(id) => {
        await deleteDoc(doc(db, 'todos', id));
    }

    const handleModalOpen = () => {
        setIsOpen(true)
    }

    const handleModalClose = () => {
        setIsOpen(false)
    }

    return (
        <div className=''>
        <div className='bg-[rgb(3,21,37)] pt-32'>
                <div className='max-w-2xl mx-auto bg-white px-4 py-4 rounded-lg'>
                    <div className='px-4 flex justify-center flex-col'>
                        <h1 className='text-3xl font-bold pb-8 text-center'>My Tasks</h1>
                        <ul className='w-[500px] flex gap-4 flex-col pb-8 mx-auto'>
                            {todos.map((task, index) => (
                                <Today 
                                    key={index} 
                                    todo={task} 
                                    toggleComplete={toggleComplete}
                                    deleteTodo={deleteTodo}
                                />
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
            </div>   
        </div>
    )
}
