import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

export default function RenderTasks({ todo, toggleComplete, deleteTodo }) {
  return (
    <li
      onClick={() => toggleComplete(todo)} 
      className='flex items-center w-full justify-between hover:bg-zinc-200  px-4 py-1 rounded-md'
    >
        <div className='flex items-center gap-4'>
          <input 
            type="checkbox" 
            className='cursor-pointer'
            checked={todo.completed ? 'checked' : ''}
            onChange={() => toggleComplete(todo)}
          />
          <div className='flex flex-col'>
            <span className={`font-medium text-lg ${todo.completed ? 'text-gray-400 line-through' : 'text-black'}`}>{todo.task}</span>
            <span className={`text-sm ${todo.completed ? 'text-green-400 line-through' : 'text-green-500'}`}>{todo.date}</span>
          </div>
          
        </div>
        <div className='flex items-center gap-8'>
          <span>{todo.label}</span>
          <div 
            className='cursor-pointer'
            onClick={() => deleteTodo(todo.id)}
          >
            <FaTrashAlt />
        </div>
        </div>
    </li>
  )
}
