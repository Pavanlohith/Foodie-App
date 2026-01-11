import React from 'react'
import NavBar from './components/Sidebsar/Navbar/NavBar'
import Sidebar from './components/Sidebsar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './Pagess/Add/Add'
import List from './Pagess/List/List'
import Orders from './Pagess/Orders/Orders'



const App = () => {
  const url = "https://foodie-app-eight-tau.vercel.app/"
  return (
    <div>
      <NavBar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
       <div className="page-content">
    <Routes>
      <Route path="/add" element={<Add url={url} />} />
      <Route path="/list" element={<List url={url} />} />
      <Route path="/orders" element={<Orders url={url} />} />
    </Routes>
  </div>
      </div>
    </div>
  )
}

export default App