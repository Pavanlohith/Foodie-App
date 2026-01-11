import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Orders.css'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      alert("Error");
    }
  };
  const stausHandler=async(event,orderId)=>{
    const response=await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }


  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((item, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />

            <div>
              <p className='order-item-food'>
                {item.items.map((food, i) => {
                  if (i === item.items.length - 1) {
                    return food.name + " x " + food.quantity;
                  } else {
                    return food.name + " x " + food.quantity + ", ";
                  }
                })}
              </p>
              <p className='order-item-name'>
  {item.address?.firstName} {item.address?.lastName}
</p>
  <p className='order-item-address'>
        {item.address?.street}, {item.address?.city}, {item.address?.state} - {item.address?.pincode}
      </p>

      <p className='order-item-phone'>
         {item.address?.phone}
      </p>
   <p>Items: {item.items.length}</p>
    <p className='order-item-amount'>
        ${item.amount}
      </p>
      <select
  onChange={(event) => stausHandler(event, item._id)}
  value={item.status}
>
  <option value="Food Processing">Food Processing</option>
  <option value="Out For Delivary">Out For Delivery</option>
  <option value="Delivered">Delivered</option>
</select>

  
            </div>

          </div>
        ))}
     

      </div>
    </div>
  );
};

export default Orders;
