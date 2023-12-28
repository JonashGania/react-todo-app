import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TogglePage from '../components/TogglePage';
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
      <TogglePage />
      <div className='max-w-2xl mx-auto pt-5 px-4'>
        <div className='flex items-center justify-center gap-3 sm:gap-6 z-20 bg-[rgb(25,38,49)] transition-all duration-200 ease-in sm:max-w-[445px] max-w-[295px] mx-auto py-[6px] sm:py-2 rounded-3xl'>
          <button
            onClick={() => switchMode('work', modeDurations.work)} 
            className={` px-4 sm:px-6 py-2 text-sm sm:text-xl font-semibold rounded-3xl transition-all duration-200 ease-in ${mode === 'work' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          >
            Work
          </button>
          <button 
            onClick={() => switchMode('shortBreak', modeDurations.shortBreak)} 
            className={`px-3 sm:px-5 py-2 text-sm sm:text-xl font-semibold rounded-3xl transition-all duration-200 ease-in ${mode === 'shortBreak' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          >
            Short Break
          </button>
          <button 
            onClick={() => switchMode('longBreak', modeDurations.longBreak)} 
            className={`px-3 sm:px-5 py-2 text-sm sm:text-xl font-semibold rounded-3xl transition-all duration-200 ease-in ${mode === 'longBreak' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
          >
            Long Break
          </button>
        </div>

        <div className='flex justify-center items-center pt-20 sm:pt-12 transition-all duration-200 ease-in'>
          <p className='text-black text-6xl sm:text-[5rem] font-semibold transition-all duration-200 ease-in'>
            {formatTime(timer)}
          </p>
        </div>

        <div className='flex justify-center items-center pt-20 sm:pt-10 gap-7 transition-all duration-200 ease-in'>
          <button 
            onClick={handleStartPause}
            className='px-7 py-2 bg-[rgb(25,38,49)] text-white text-base sm:text-xl font-semibold rounded-3xl active:translate-y-1 transition-all duration-200 ease-in'
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button onClick={handleRestart}>
            <MdRestartAlt 
              size={'3rem'}
              color='rgb(25,38,49)'
            />
          </button>
        </div>

        
      </div>
    </div>
  )
}
