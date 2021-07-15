import React from 'react';
import '../styles/about.scss';
import { FaSass, FaReact, FaChartArea } from 'react-icons/fa';
import { SiFirebase } from 'react-icons/si';
import backgroundImage from '../img/background.svg';

const About = () => {
  return (
    <div
      className='main-container'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='about-container'>
        <h1>About</h1>
        <div className='about'>
          <div className='col'>
            <p>Used technology:</p>
            <ul>
              <li>
                <FaReact />
                React
              </li>
              <li>
                <FaSass />
                Sass
              </li>
              <li>
                <SiFirebase />
                Firebase
              </li>
              <li>
                <FaChartArea />
                Recharts
              </li>
            </ul>
          </div>
          <div className='col'>
            <p>Used API:</p>
            <a href='https://www.coingecko.com/en/api'>
              <img
                src='https://static.coingecko.com/s/coingecko-logo-d13d6bcceddbb003f146b33c2f7e8193d72b93bb343d38e392897c3df3e78bdd.png'
                alt='coingecko logo'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
