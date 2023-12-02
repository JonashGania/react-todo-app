import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Pomodoro() {
  const [timer, setTimer] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');

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
      if(mode === 'pomodoro'){
        switchMode('shortBreak', 5 * 60);
      } else if (mode === 'shortBreak'){
        switchMode('pomodoro', 25 * 60);
      } else if (mode === 'longBreak'){
        switchMode('pomodoro', 25 * 60);
      }
    }

    return () => clearInterval(countdown)
  }, [isActive, timer, mode])

  const renderTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds}`
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-2xl mx-auto pt-5'>
        <div className='flex items-center justify-center gap-6'>
          <button
            onClick={() => switchMode('pomodoro', 25 * 60)} 
            className={`px-4 py-2 text-xl font-semibold border border-white rounded-3xl ${mode === 'pomodoro' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          >
            Pomodoro
          </button>
          <button 
            onClick={() => switchMode('shortBreak', 5 * 60)} 
            className={`px-4 py-2 text-xl font-semibold border border-white rounded-3xl ${mode === 'shortBreak' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          >
            Short Break
          </button>
          <button 
            onClick={() => switchMode('longBreak', 10 * 60)} 
            className={`px-4 py-2 text-xl font-semibold border border-white rounded-3xl ${mode === 'longBreak' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          >
            Long Break
          </button>
        </div>

        <div className='flex justify-center items-center pt-12'>
          <CountdownCircleTimer
            isPlaying
            duration={30}
            size={220}
            strokeWidth={20}
            colors='#0ea5e9'
            className='relative'
          >
            <h2 className='absolutetext-white text-2xl z-30'>{renderTime(timer)}</h2>
          </CountdownCircleTimer>
        </div>

      </div>
    </div>
  )
}
