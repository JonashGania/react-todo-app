import PropTypes from 'prop-types'
import { FaTrashAlt } from "react-icons/fa";
import Checkbox from './Checkbox';

export default function RenderTasks({ todo, toggleComplete, deleteTodo }) {

  return (
    <li
      onClick={() => toggleComplete(todo)} 
      className={`flex items-center w-full justify-between hover:bg-zinc-200 px-2 sm:px-4 py-1 rounded-md ${todo.completed ? 'bg-zinc-200' :'bg-zinc-transparent'}`}
    >
        <div className='flex items-center gap-2 sm:gap-4'>
          <Checkbox completed={todo.completed} toggleComplete={() => toggleComplete(todo)}/>
          <div className='flex flex-col'>
            <span className={`font-medium sm:text-lg text-base ${todo.completed ? 'text-gray-400 line-through' : 'text-black'}`}>{todo.task}</span>
            <span className={`text-xs sm:text-sm ${todo.completed ? 'text-green-400 line-through' : 'text-green-500'}`}>{todo.date}</span>
          </div>
          
        </div>
        <div className='flex items-center gap-4 sm:gap-8'>
          <span className=' text-sm sm:text-base'>{todo.label}</span>
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


RenderTasks.propTypes = {
  todo: PropTypes.shape([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.string,
    PropTypes.instanceOf(Date),

  ]),
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
}