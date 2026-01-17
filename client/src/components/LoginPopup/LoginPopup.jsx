import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
const LoginPopup = ({ setShowLoginPopup }) => {
  const {url,setToken}=useContext(StoreContext) 
  const [currentState,setCurrentState]=React.useState('Login')
    const[data,setData]=useState({
      name:"",
      email:"",
      password:"",

    })
    const onChangeHandler=(event)=>{
      const name=event.target.name
      const value=event.target.value
      setData(data=>({...data,[name]:value}))
    }
    const onLogin=async(event)=>{
      event.preventDefault();
      let newUrl=url;
      if(currentState==='Login'){
        newUrl+="/api/user/login"

      }
   else{
    newUrl+="/api/user/register"
   }
   const response=await axios.post(newUrl,data,{headers:{"Content-Type":"application/json"},credentials:"include"});

   if(response.data.success){
    setToken(response.data.token);
    localStorage.setItem("token",response.data.token);
    setShowLoginPopup(false)


   }
   else{
    alert(response.data.message)
   }

    }
   
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLoginPopup(false)} src={assets.cross_icon} alt="" />

        </div>
        <div className="login-popp-input">
            {currentState==="Login"?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your name' required />}
           
            <input name='email' onChange={onChangeHandler} value={data.email } type="email" placeholder='Enter your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password}  type="password" placeholder='Enter your password' required />
           
        </div>
        <button type='submit'>{currentState==="Sign Up"?"Create account" : "Login"}</button>
      <div className="logi-popup-condition">
        <input type="checkbox" required />
        <p>By continuing,i agree to the terms of use & privacy policy </p>
      </div>
      {currentState==="Login"
      ? <p> crate a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
      : <p>already Have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
      }
      </form>
    </div>
  )
}

export default LoginPopup