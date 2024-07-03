import React, { useRef, useState } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import PosterFallback from '../../assets/no-poster.png';
import Genres from '../genres/Genres';
import useIsMobileViewport from '../../hooks/useIsMobileViewport';
import { IoIosInformationCircle } from "react-icons/io";

import './style.scss';
import { PosterBlockDetail } from '../../pages/home/PosterBlockDetail';
import StarRating2 from '../circleRating/StarRating';

const Carousel = ({ data, loading, endpoint, title, activeCard }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const isMobile = useIsMobileViewport();


  const handleHover = (e, data) => {
    let parentElem = e.target;
    if (parentElem.tagName === 'path') {
      parentElem = parentElem.parentElement;
    }
    if (parentElem.tagName === 'svg') {
      parentElem = parentElem.parentElement;
    }
    const parentRect = parentElem.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    // console.log({ position: parentRect, viewportWidth, data, isHovered: true });
    activeCard({ position: parentRect, viewportWidth, viewportHeight, data, isHovered: true });
  };

  const handleMouseOut = () => {
    activeCard({ isHovered: false });
  };

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const skItem = () => {
    return (
      <div className='skeletonItem'>
        <div className='posterBlock skeleton'></div>
        <div className='textBlock'>
          <div className='title skeleton'></div>
          <div className='date skeleton'></div>
        </div>
      </div>
    );
  };

  return (
    <div className='carousel'>
      {data?.length > 0 && (
        <ContentWrapper>
          {title && <div className='carouselTitle'>{title}</div>}
          <BsFillArrowLeftCircleFill
            className='carouselLeftNav arrow'
            onClick={() => navigation('left')}
          />
          <BsFillArrowRightCircleFill
            className='carouselRightNav arrow'
            onClick={() => navigation('right')}
          />
          {!loading ? (
            <div className='carouselItems' ref={carouselContainer}>
              {data?.map((item) => {
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;
                return (
                  <div
                    key={item.id}
                    className='carouselItem'
                    onClick={() =>
                      navigate(`/${item.media_type || endpoint}/${item.id}`)
                    }
                  >
                    <div className='posterBlock'>
                      <Img src={posterUrl} />
                      {/* <Genres data={item.genre_ids} /> */}
                      <StarRating2 rating={item.vote_average / 2} />
                      {!isMobile &&
                        <div
                          onMouseOver={(e) => handleHover(e, item)}
                          onMouseOut={handleMouseOut}
                          className={`posterBlockDetails ${item.id} poster-details position-absolute h-100 w-100 d-flex justify-content-center align-items-center`}>
                          <span />
                          <IoIosInformationCircle className='' size={60} />
                        </div>
                      }
                    </div>
                    <div className='textBlock'>
                      <div className='carouselItem-info d-flex justify-content-between align-content-between align-items-end px-1'>
                        <span className='date'>{dayjs(item.release_date || item.first_air_date).format(
                          'YYYY'
                        )}</span>
                        {item.media_type ? (
                          <span className='media_type'>
                            {item.media_type.toUpperCase()}
                          </span>
                        ) : null}
                        {item.original_language ?
                          <span>
                            {item.original_language.toUpperCase()}
                          </span>
                          : null
                        }
                      </div>
                      <span className='title'>{item.title || item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='loadingSkeleton'>
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default Carousel;
