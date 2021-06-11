import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiLeftArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../styles/single-coin.scss';

const SingleCoin = () => {
  const { id } = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      const response = await fetch(url);
      const coinData = await response.json();
      setCoin(coinData);
      console.log(coinData);
    };
    fetchCoin();
  }, []);

  return (
    coin && (
      <div className='single-coin-container'>
        <div className='top-bar'>
          <Link to='/coins-list'>
            <BiLeftArrow />
          </Link>
          <div className='name'>
            <img src={coin.image.small} alt='coin-icon' />
            <p>{coin.name}</p>
          </div>
        </div>
        <div className='content'>
          <div className='chart-column'>chart</div>
          <div className='details-column'></div>
        </div>
      </div>
    )
  );
};

export default SingleCoin;
