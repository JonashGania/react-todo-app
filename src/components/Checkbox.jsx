import { FaCheck } from "react-icons/fa";

export default function Checkbox({ completed, toggleComplete }) {
  return (
    <div 
        className={`sm:w-5 sm:h-5 w-4 h-4 rounded-[50%] flex justify-center items-center ${completed ? 'bg-green-600 border-none' : 'bg-transparent border-2 border-gray-400'}`}
        onClick={toggleComplete}
    >
        <FaCheck 
            size=".8rem" 
            color='white'
            className={`${completed ? "block" : 'hidden'}`}
        />
    </div>
  )
}
