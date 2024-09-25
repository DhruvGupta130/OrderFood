import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminRoutes } from './AdminRoutes'
import CustomRoutes from './CustomRoutes'
import { Navbar } from '../component/navbar/Navbar'

export const Routers = () => {
  return (
    <div>
      <Navbar/>
        <Routes>
            <Route path='/admin/restaurant/*' element={<AdminRoutes/>} />
            <Route path='/*' element={<CustomRoutes/>} />
        </Routes>
    </div>
  )
}
