import React from 'react'
import Navbar from './components/navbar/Navbar'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Cart from './pages/cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import './App.css'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import Verify from './pages/verify/verify.jsx'
import MyOrders from './pages/myOrders/MyOrders.jsx'
const App = () => {
  const [showLoginPopup,setShowLoginPopup]=React.useState(false)
  return (
    <>
    {showLoginPopup?<LoginPopup setShowLoginPopup={setShowLoginPopup} />:<></>}
        <div className='app'>
      <Navbar setShowLoginPopup={setShowLoginPopup} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
         <Route path='/verify' element={<Verify/>} />
           <Route path='/myorders' element={<MyOrders/>} />
      </Routes>
      </div>
    <Footer/>
   
    </>
   
  )
}

export default App