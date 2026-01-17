import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/frontend_assets/assets'

const MyOrders = () => {
  const [data, setData] = useState([])
  const { url, token } = useContext(StoreContext)

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/usersorders",
        {},
        { headers: { token, "Content-Type": "application/json" }, credentials: "include" }
      )
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>

      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            
            <img src={assets.parcel_icon} alt="order" />

            {/* Items list */}
            <p className="order-items">
              {order.items.map((item, idx) => (
                <span key={idx}>
                  {item.name} × {item.quantity}
                  {idx !== order.items.length - 1 && ", "}
                </span>
              ))}
            </p>

            {/* Amount */}
            <p>${order.amount}.00</p>

            {/* Total quantity */}
            <p>
              Items: {order.items.reduce((total, item) => total + item.quantity, 0)}
            </p>

            {/* Status */}
            <p className="order-status">
              <span className="status-dot">&#x25FC;</span>
              <b>{order.status}</b>
            </p>

            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
