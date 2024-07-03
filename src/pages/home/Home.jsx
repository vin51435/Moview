import React, { useState } from 'react';
import './style.scss';
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';
import { PosterBlockDetail } from './PosterBlockDetail';
const Home = () => {
  const [activeData, setActiveData] = useState({});

  const activeCard = (data) => {
    setActiveData(data);
  };

  return (
    <div className='homePage'>
      <HeroBanner />
      <Popular activeCard={activeCard} />
      <Trending activeCard={activeCard} />
      <TopRated activeCard={activeCard} />
      <PosterBlockDetail activeData={activeData} />
    </div>
  );
};

export default Home;
