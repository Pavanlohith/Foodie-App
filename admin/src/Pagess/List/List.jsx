import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'

const List = ({url}) => {

  
  const [list, setList] = useState([])

  // Fetch list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      setList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

 
  const removeFood = async (id) => {
    try {
      await axios.post(`${url}/api/food/remove`, { id })
      fetchList() // refresh list after delete
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="list">
      <h2>Food List</h2>

      <div className="list-table">
        <div className="list-table-header">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {list.map((item) => (
          <div className="list-table-row" key={item._id}>
            <img src={`${url}/images/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <button
              className="remove-btn"
              onClick={() => removeFood(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
