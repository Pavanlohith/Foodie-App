import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExploreMenu.css';

const ExploreMenu = ({ url }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`${url}/api/food/list`);
        if (res.data.success) {
          setFoods(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFoods();
  }, [url]);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Discover all our delicious dishes, freshly prepared every day.
      </p>

      <div className="explore-menu-list">
        {foods.map((item) => (
          <div key={item._id} className="explore-menu-list-item">
            <img src={`${url}/uploads/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
