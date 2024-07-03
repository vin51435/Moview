import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  // console.log('genres, data: ', genres, data);

  return (
    <div className='genres'>
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        {/* console.log('filter: ', g); */ }
        return (
          <div key={g} className='genre'>
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};
const Genres2 = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  // console.log('genres, data: ', genres, data);

  return (
    <>
      {data?.map((gId, index) => {
        const genre = Object.values(genres).find((genre) => genre.id === gId);
        if (!genre || !genre.name) return null;
        {/* console.log('filter: ', genre.name); */ }
        const comma = index !== data.length - 1 ? ', ' : '';

        return (
          <React.Fragment key={genre.id}>
            <span className=''>{genre.name}</span>
            <span className='comma'>{comma}&nbsp;</span>
          </React.Fragment>
        );
      })}
    </>
  );
};

export { Genres2 };

export default Genres;
