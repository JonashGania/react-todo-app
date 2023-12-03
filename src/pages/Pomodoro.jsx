import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { MdRestartAlt } from "react-icons/md";


export default function Pomodoro() {
  const [timer, setTimer] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const modeDurations = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  }

  const switchMode = (newMode, duration) => {
    setMode(newMode);
    setTimer(duration);
    setIsActive(false);
  }

  useEffect(() => {
    let countdown;

    if (isActive && timer > 0){
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (isActive && timer === 0){
      setIsActive(false);
      if(mode === 'work'){
        switchMode('shortBreak', modeDurations.shortBreak);
      } else if (mode === 'shortBreak'){
        switchMode('work', modeDurations.work);
      } else if (mode === 'longBreak'){
        switchMode('work', modeDurations.work);
      }
    }

    return () => clearInterval(countdown)
  }, [isActive, timer, mode, modeDurations])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  }

  const handleRestart = () => {
    switchMode(mode, modeDurations[mode]);
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-2xl mx-auto pt-5'>
        <div className='flex items-center justify-center gap-6 bg-[rgb(25,38,49)] max-w-[445px] mx-auto py-2 rounded-3xl'>
          <button
            onClick={() => switchMode('work', modeDurations.work)} 
            className={`px-6 py-2 text-xl font-semibold rounded-3xl ${mode === 'work' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          >
            Work
          </button>
          <button 
            onClick={() => switchMode('shortBreak', modeDurations.shortBreak)} 
            className={`px-5 py-2 text-xl font-semibold rounded-3xl ${mode === 'shortBreak' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          >
            Short Break
          </button>
          <button 
            onClick={() => switchMode('longBreak', modeDurations.longBreak)} 
            className={`px-5 py-2 text-xl font-semibold rounded-3xl ${mode === 'longBreak' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          >
            Long Break
          </button>
        </div>

        <div className='flex justify-center items-center pt-12'>
          <p className='text-white text-[5rem] font-semibold'>
            {formatTime(timer)}
          </p>
        </div>

        <div className='flex justify-center items-center pt-10 gap-7'>
          <button 
            onClick={handleStartPause}
            className='px-7 py-2 bg-white text-black text-xl font-semibold rounded-3xl active:translate-y-2 duration-200 ease-in'
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button onClick={handleRestart}>
            <MdRestartAlt 
              size={'3.5rem'}
              color='white'
            />
          </button>
        </div>
      </div>
    </div>
  )
}
