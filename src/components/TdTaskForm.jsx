import React, { useState } from 'react'
import Today from './Today'

export default function TdTaskForm() {
    const [todos, setTodos] = useState(['Learn react', 'Apply for Intern']);

    return (
        <div>
            <form>
                <div>
                    
                </div>
            </form>
            <ul className='w-[300px] flex gap-4 flex-col'>
                {todos.map((task, index) => (
                    <Today key={index} todo={task}/>
                ))}
            </ul>
        </div>
    )
}
