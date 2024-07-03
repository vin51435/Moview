import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaRegUserCircle
} from 'react-icons/fa';

import ContentWrapper from '../contentWrapper/ContentWrapper';

import './style.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <ContentWrapper>
        <ul className='menuItems'>
          <li className='menuItem'>Terms Of Use</li>
          <li className='menuItem'>Privacy-Policy</li>
          <li className='menuItem'>About</li>
          <li className='menuItem'>Blog</li>
          <li className='menuItem'>FAQ</li>
        </ul>
        <div className='infoText'>
          Explore the world of cinema with Moview, your ultimate destination for up-to-date movie details. Discover comprehensive information on the latest releases, including cast members, ratings, trailers, and more. Stay informed and entertained with our curated collection of cinematic insights and updates.
        </div>
        <div className='socialIcons'>
          <span className='icon'>
            <FaLinkedin />
          </span>

          <span className='icon'>
            <FaInstagram />
          </span>

          <span className='icon'>
            <FaRegUserCircle />
          </span>

        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
