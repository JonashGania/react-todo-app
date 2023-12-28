import { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6"
import RenderTasks from '../components/RenderTasks'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'
import TogglePage from '../components/TogglePage'
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db, auth } from '../config/firebase'
import { RotatingLines } from  'react-loader-spinner'
import useGetUserInfo from '../hooks/UseGetUserInfo'



export default function Tasks() {
    const [isOpen, setIsOpen] = useState(false);
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userInfo = useGetUserInfo();

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
        <div className='pb-10'>
            <Navbar />
            <TogglePage />
            <div className='max-w-2xl min-h-[400px] mx-auto bg-white px-4 py-4 rounded-lg flex justify-between flex-col'>
                {isLoading ? (
                    <div className='w-full min-h-[400px] grid place-items-center'>
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
                    <>
                        <div className='flex flex-col justify-between'>
                            <h1 className='text-2xl sm:text-3xl font-bold pb-8 text-center transition-all duration-300 ease-in'>{userInfo.name}&apos;s Tasks</h1>
                            <ul className='max-w-[500px] w-full flex gap-4 flex-col pb-8 mx-auto'>
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
                            className='flex items-center justify-center gap-2 sm:px-3 sm:py-3 px-2 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white w-[125px] active:translate-y-2  transition-all duration-200 ease-in '
                            onClick={handleModalOpen}
                        >
                            <FaPlus size={'1.1rem'} color='white'/>
                            <span className='text-base sm:text-lg'>Add Task</span>
                        </button>
                    </>
                )}
            </div>
        </div>   
    )
}
