import React, { useState } from 'react';

import Carousel from '../../../components/carousel/Carousel';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';

import useFetch from '../../../hooks/useFetch';
import { PosterBlockDetail } from '../PosterBlockDetail';

const Popular = ({ activeCard, activeData }) => {
  const [endpoint, setEndpoint] = useState('movie');

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
  };

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className='carouselTitle'>Popular</span>
        <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} activeCard={activeCard} />
      {/* <PosterBlockDetail activeData={activeData} /> */}
    </div>
  );
};

export default Popular;
