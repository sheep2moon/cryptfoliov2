import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiLeftArrow } from 'react-icons/bi';

import '../../styles/single-coin.scss';
import PriceChart from './PriceChart';
import AddToPortfolio from './AddToPortfolio';
import MarketData from './MarketData';
import { useFirebase } from '../../contexts/firebaseContext';
import { useHistory } from 'react-router-dom';

const SingleCoin = () => {
  const { id } = useParams();
  const { user } = useFirebase();
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;
  const [coin, setCoin] = useState(null);
  const [days, setDays] = useState(30);
  const history = useHistory();

  useEffect(() => {
    const fetchCoin = async () => {
      const response = await fetch(url);
      const coinData = await response.json();
      setCoin(coinData);
    };
    fetchCoin();
    return () => setCoin({});
  }, [url]);

  return (
    coin && (
      <div className='main-container'>
        <div className='single-coin-container'>
          <div className='top-bar'>
            <button onClick={() => history.goBack()}>
              <BiLeftArrow />
            </button>

            <div className='name'>
              <img src={coin.image.small} alt='coin-icon' />
              <p>{`${coin.name}  (${coin.symbol.toUpperCase()})`}</p>
            </div>
          </div>
          <MarketData coin={coin} />
          <div className='price-chart-container'>
            <div className='time-buttons'>
              <button
                style={days === 1 ? { background: '#ffffff20' } : {}}
                onClick={() => setDays(1)}
              >
                24h
              </button>
              <button
                style={days === 30 ? { background: '#ffffff20' } : {}}
                onClick={() => setDays(30)}
              >
                last 30 days
              </button>
              <button
                style={days === 365 ? { background: '#ffffff20' } : {}}
                onClick={() => setDays(365)}
              >
                last year
              </button>
            </div>
            <PriceChart coinId={coin.id} days={days} />
          </div>
          {user && <AddToPortfolio coin={coin} />}
        </div>
      </div>
    )
  );
};

export default SingleCoin;
