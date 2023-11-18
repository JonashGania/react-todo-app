import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

export default function Today({todo}) {
  return (
    <li className='flex items-center w-full justify-between'>
        <div className='flex items-center gap-4'>
          <input 
            type="checkbox" 
            className='cursor-pointer'
          />
          <span>{todo}</span>
        </div>
        <div className='cursor-pointer'>
          <FaTrashAlt />
        </div>
    </li>
  )
}
