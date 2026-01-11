import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt='logo' />
        <p>
                  We are passionate about delivering fresh and delicious food straight to your doorstep. 
                  Explore our diverse menu, crafted with care to satisfy every craving.
                </p>
              <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt='facebook' />
                <img src={assets.twitter_icon} alt='twitter' />
               
                <img src={assets.linkedin_icon} alt='linkedin' />
              </div>
            </div>
        <div className="footer-content-centre">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivary</li>
                <li>Privacy Policy</li>
            </ul>

        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 7207926419</li>
                <li>contact @pavanlohith006.com</li>
                
            </ul>

        </div>
       
    </div>
    <hr />
    <p className='footer-copy-right'>© 2024 Pavan Lohith. All rights reserved.</p>
    </div>
  )
}

export default Footer