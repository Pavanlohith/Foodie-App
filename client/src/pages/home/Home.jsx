import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx';
import FoodDisplay from '../../components/Fooddisplay/FoodDisplay.jsx';
import Header from '../../components/navbar/Header/Header.jsx';
import AppDownload from '../../components/AppDownload/AppDownload.jsx';

const Home = () => {
  const [category, setCategory] = useState('All');
  const { food_list } = useContext(StoreContext);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} food_list={food_list} />
      <FoodDisplay category={category} food_list={food_list} />
      <AppDownload />
    </div>
  );
};

export default Home;
