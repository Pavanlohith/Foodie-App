import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItems from '../FoodItems/FoodItems.jsx'
import { StoreContext } from '../../context/StoreContext'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>

      <div className="food-display-items">
        {food_list.map((item) => {
            if(category==="All" || item.category===category){
           return  <FoodItems
            key={item._id}        
            id={item._id}         
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
            }

   
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
