import React from 'react'
import { IoClose } from "react-icons/io5";


export default function Modal({onSubmit, onClose}) {
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center'>
        <div className='bg-white px-4 py-4 w-[700px] rounded-md'>
            <div className='flex justify-end'>
                <div className='cursor-pointer' onClick={onClose}>
                    <IoClose 
                        size={"1.7rem"}
                        color='#4b5563'    
                    />
                </div>
            </div>
            <form>
                <div className='flex gap-8'>
                    <div className='w-[50%] flex gap-4 flex-col'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="title" className='font-medium'>Title:</label>
                            <input 
                                type="text" 
                                id='title'
                                className='border border-gray-400 px-2 py-2 rounded-md outline-none'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="date" className='font-medium'>Date:</label>
                            <input 
                                type="date" 
                                id='title'
                                className='border border-gray-400 px-2 py-2 rounded-md outline-none'    
                            />
                        </div>
                    </div>
                    <div className='w-[50%] flex gap-4 flex-col'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="label" className='font-medium'>Label:</label>
                            <select 
                                id="label"
                                className='border border-gray-400 px-2 py-2 rounded-md outline-none'
                            >
                                <option value="Home">Home</option>
                                <option value="Study">Study</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="description" className='font-medium'>Description:</label>
                            <textarea 
                                id="description" 
                                cols="30" 
                                rows="3"
                                className='border border-gray-400 resize-none px-2 py-2 rounded-md outline-none'
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end pt-8'>
                    <button 
                        className='px-2 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md'
                        onClick={onClose}
                    >Add Task
                </button>
            </div>
            </form>
            
        </div>      
    </div>
  )
}
