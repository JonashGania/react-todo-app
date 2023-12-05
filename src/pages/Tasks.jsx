import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6"
import RenderTasks from '../components/RenderTasks'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { RotatingLines } from  'react-loader-spinner'
import useGetUserInfo from '../hooks/UseGetUserInfo'


export default function Tasks() {
    const [isOpen, setIsOpen] = useState(false);
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { name } = useGetUserInfo();

    useEffect(() => {
        const user = auth.currentUser;

        if(!user){
            return
        }

        const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((document) => {
                todosArr.push({...document.data(), id: document.id})
            })

            todosArr.sort((taskA,taskB) => {
                const dateA = new Date(taskA.date);
                const dateB = new Date(taskB.date);

                return dateA - dateB;
            })

            setTodos(todosArr);
            setIsLoading(false);
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
        <div className='bg-[rgb(3,21,37)] pb-10'>
            <Navbar />
            
            <div className='max-w-2xl min-h-[400px] mx-auto bg-white px-4 py-4 rounded-lg flex justify-between flex-col'>
                {isLoading ? (
                    <div className='w-full min-h-[400px] grid place-items-center'>
                        <RotatingLines 
                            strokeColor="rgb(2,132,199)"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="70"
                            visible={true}
                        />
                    </div>
                ) : (
                    <>
                        <div className='px-4 flex flex-col justify-between'>
                            <h1 className='text-3xl font-bold pb-8 text-center'>{name}&apos;s Tasks</h1>
                            <ul className='w-[500px] flex gap-4 flex-col pb-8 mx-auto'>
                                {todos.map((task, index) => (
                                    <RenderTasks 
                                        key={index} 
                                        todo={task} 
                                        toggleComplete={toggleComplete}
                                        deleteTodo={deleteTodo}
                                    />
                                ))}
                            </ul>
                            <Modal onClose={handleModalClose} isOpen={isOpen}/>
                        </div>
                        <button 
                            className='flex items-center gap-2 text-lg px-3 py-3 bg-sky-600 hover:bg-sky-700 rounded-md text-white w-[125px] active:scale-110  transition-all duration-200 ease-in '
                            onClick={handleModalOpen}
                        >
                            <FaPlus size={'1.1rem'} color='white'/>
                            Add Task
                        </button>
                    </>
                )}
            </div>
        </div>   
    )
}
