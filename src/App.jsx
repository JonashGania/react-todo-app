import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Tasks from './pages/Tasks'
import Pomodoro from './pages/Pomodoro'
import Navbar from './components/Navbar'
function App() {

  return (
    <div className='w-full h-screen bg-[rgb(3,21,37)]'>
      <Navbar />

      <Routes>
        <Route path='/' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/tasks' element={<Tasks />}/>
        <Route path='/pomodoro' element={<Pomodoro/>}/>
      </Routes>
    </div>
  )
}

export default App
