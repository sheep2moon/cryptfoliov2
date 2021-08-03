import React from 'react';
import '../../styles/homepage.scss';
import backgroundImage from '../../img/background.svg';
import portfolioImage from '../../img/portfolio.png';
import BestCoins from './BestCoins';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div
      className='main-container'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='home-container'>
        <h1 className='title'>Cryptfolio cryptocurrency portfolio tracker</h1>
        <div className='content'>
          <div className='about-portfolio'>
            <img src={portfolioImage} alt='' width='600' />
            <div className='text'>
              <p>Dive into cryptocurrency world today.</p>
              <p>Register for free and start tracking your portfolio.</p>
              <div className='links'>
                <Link to='/register'>Register</Link>
                <Link to='/coins-list'>Browse Coins</Link>
              </div>
            </div>
          </div>
        </div>
        <BestCoins />
      </div>
    </div>
  );
};

export default Home;
