import React from 'react';
import '../../styles/homepage.scss';
import backgroundImage from '../../img/background.svg';
import portfolioImage from '../../img/portfolio.png';
import BestCoins from './BestCoins';
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
              <p>register and start tracking your portfolio now.</p>
              <div className='links'>
                <button className='btn'>Register</button>
                <button className='btn'>Coins List</button>
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
