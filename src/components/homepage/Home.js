import React from 'react';
import '../../styles/homepage.scss';
import backgroundImage from '../../img/background.svg';
import portfolioImage from '../../img/portfolio.png';
const Home = () => {
  return (
    <div
      className='main-container'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='home-container'>
        <h1 className='title'>Cryptfolio - Cryptocurrency portfolio tracker</h1>
        <div className='content'>
          <div className='about-portfolio'>
            <p>register and start track your portfolio now.</p>
            <img src={portfolioImage} alt='' width='600' />
          </div>
          <div className='links'>
            <p>Register now and start track your cryptocurrencies</p>
            <button className='btn'>Register</button>
            <p>Check cryptocurrencies market prices</p>
            <button className='btn'>Browse Market</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
