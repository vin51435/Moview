import React from 'react';
import './style.scss';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import Genres, { Genres2 } from '../../components/genres/Genres';

export const PosterBlockDetail = ({ activeData }) => {
  const data = activeData?.data;

  const active = activeData?.isHovered;
  const pos = activeData?.position;
  const vw = activeData?.viewportWidth;
  const vh = activeData?.viewportHeight;
  const width = 300;
  const height = 500;
  let left = 0;
  let top = 0;
  let DivStyle = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    // height: `${height}px`,
    height: `auto`,
  };
  if (pos) {
    // Horizontal positioning
    if ((pos.x + pos.width + width) > vw) {
      DivStyle = {
        ...DivStyle,
        left: (pos.x - width) - 10
      };
    } else {
      DivStyle = {
        ...DivStyle,
        left: pos.x + pos.width + 10
      };
    }

    // Vertical positioning
    if (pos.y < -10) {
      // console.log('up');
      DivStyle = {
        ...DivStyle,
        top: pos.height + pos.y
      };

    } else if (pos.y > 0 && (pos.y + pos.height) < vh) {
      // console.log('middle');
      DivStyle = {
        ...DivStyle,
        top: pos.y
      };
    } else {
      // console.log('down');
      DivStyle = {
        ...DivStyle,
        top: pos.y - pos.height
      };
    }
    // console.log({ DivStyle });
  };
  // console.log(activeData);

  return (
    <>
      {/* {active && */}
      <div className={`posterBlockDetailsDiv ${active ? 'visible' : 'invisible'}`} style={DivStyle}>
        <h3>{data?.title || data?.name}</h3>
        <div className='details d-flex align-items-center justify-content-start '>
          {data?.media_type ? <span>{data?.media_type.toUpperCase()}</span> : null}
          {data?.release_date ? <span>{dayjs(data?.release_date || data?.first_air_date).format('YYYY')}</span> : null}
          {data?.vote_average ? <span>{data?.vote_average.toFixed(1)}&#9733;</span> : null}
          {data?.adult ? <span>A</span> : null}
        </div>
        <hr />
        <div className='categories'>
          <p>Country: <span>{data?.origin_country}</span></p>
          <p>Genres: <span><Genres2 data={data?.genre_ids} /></span></p>
          <p>Scores: <span>{data?.vote_average} by {data?.vote_count}</span></p>
        </div>
        <div className='desc'>
          <p>{data?.overview}</p>
        </div>
      </div>
      {/* } */}
    </>
  );
};
