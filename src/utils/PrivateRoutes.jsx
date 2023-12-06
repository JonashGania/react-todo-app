import React, { useState } from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export const PrivateRoutes = () => {
  const { userUid } = useAuth();
  const localAuthInfo = JSON.parse(localStorage.getItem('auth'));


  return (
    (userUid || (localAuthInfo && localAuthInfo.isAuth)) ? <Outlet /> :  <Navigate to='/' />
  )
}
