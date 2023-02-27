import React from 'react'
import {
    Routes, // instead of "Switch"
    Route,
    useLocation
  } from "react-router-dom"
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import ForgotPassword from '../pages/ForgotPassword'

import { AnimatePresence } from 'framer-motion'

const AnimatedRoutes = () => {  
    const location = useLocation()

    return(
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes