import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from "axios";


const PlaceOrder = () => {

  const { getTotalCartAmount,cartItems,food_list ,url,token} = useContext(StoreContext)
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }
 const placeOrder = async (event) => {
  event.preventDefault();

  let orderItems = [];

  food_list.forEach((item) => {
    const quantity = cartItems[item._id];
    if (quantity > 0) {
      orderItems.push({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity,
      });
    }
  });

 let orderData=({
  address:data,
  items:orderItems,
  amount:getTotalCartAmount()+2
 })
  let response=await axios.post(url+"/api/order/place",orderData,{headers:{token,"Content-Type":"application/json"},credentials:"include"});
 if(response.data.success){
  const {session_url}=response.data;
  window.location.replace(session_url)
 }
 else{
  alert("Error");
 }
};

useEffect(()=>{
   if(!token){
  navigate('/cart')
   }
   else if(getTotalCartAmount()===0)
   {
    navigate('/cart')
   }
},[token])

  return (
    <form onSubmit={placeOrder} className="place-order">

      {/* LEFT SIDE */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-feilds">
          <input required
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            type="text"
            placeholder="First Name"
          />
          <input required
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input required
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Email Address"
        />

        <input required
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
        />

        <div className="multi-feilds">
          <input required
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            type="text"
            placeholder="City"
          />
          <input required
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-feilds">
          <input required
            name="pincode"
            value={data.pincode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Pincode"
          />
          <input required
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
          />
        </div>

        <input required
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          type="text"
          placeholder="Phone"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Sub Total</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>
              ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
            </b>
          </div>

          <button
            type="submit"
           
          >
            Proceed To Checkout
          </button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
