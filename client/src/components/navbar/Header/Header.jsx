import React from 'react'
import './Header.css'

const Header = () => {
  const scrollToMenu = () => {
    const section = document.getElementById('explore-menu');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favorite food</h2>
            <p>Choose a diverse menu featuring a delectable array of dishes crafted with the ingredients and culinary expertise.</p>
            <button onClick={scrollToMenu}>View Menu</button>
        </div>
    </div>
  )
}

export default Header
