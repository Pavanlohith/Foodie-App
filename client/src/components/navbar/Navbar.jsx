import React, { useContext, useState } from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLoginPopup }) => {

  const [menu, setMenu] = useState("home")
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  

  const logoutHandler = () => {
    setToken("")
    localStorage.removeItem("token")
  }
const navigate = useNavigate();
  return (
    <div className="navbar">

      <Link to="/">
        <img src={assets.logo} alt="Logo" />
      </Link>

      <ul className="nav-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>contact us</a>
      </ul>

      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="Search" /> */}

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLoginPopup(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logoutHandler}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>

    </div>
  )
}

export default Navbar
