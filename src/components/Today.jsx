import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

export default function Today({todo}) {
  return (
    <li className='flex items-center w-full justify-between hover:bg-zinc-200 transition-all duration-200 ease-in cursor-pointer px-4 py-1 rounded-md'>
        <div className='flex items-center gap-4'>
          <input 
            type="checkbox" 
            className='cursor-pointer'
          />
          <div className='flex flex-col'>
            <span className='font-medium text-lg'>{todo.task}</span>
            <span className='text-sm text-green-500'>{todo.date}</span>
          </div>
          
        </div>
        <div className='flex items-center gap-8'>
          <span>{todo.label}</span>
          <div className='cursor-pointer'>
            <FaTrashAlt />
        </div>
        </div>
    </li>
  )
}
