import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/Home/Home'
import RestaurantDetails from '../component/Restaurant/RestaurantDetails'
import { Cart } from '../component/Cart/Cart'
import Profile from '../component/profile/Profile'
import { Auth } from '../component/Auth/Auth'
import { PaymentSuccess } from '../component/Payment/PaymentSuccess'
import OrderSuccess from '../component/Cart/OrderSuccess'
import SearchResults from '../component/navbar/searchResuts'

const CustomRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/account/:register' element={<Home/>} />
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path='/my-profile/*' element={<Profile/>} />
            <Route path='/payment/success/:id' element={<PaymentSuccess/>} />
            <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Auth/>
    </div>
  )
}

export default CustomRoutes