import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiLeftArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../styles/single-coin.scss';
import PriceChart from './PriceChart';
import AddToPortfolio from './AddToPortfolio';

const redColor = '#f73f52';
const greenColor = '#39a6a3';

const SingleCoin = () => {
  const { id } = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;
  const [coin, setCoin] = useState(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const fetchCoin = async () => {
      const response = await fetch(url);
      const coinData = await response.json();
      setCoin(coinData);
      console.log(coinData);
    };
    fetchCoin();
  }, [url]);

  return (
    coin && (
      <div className='single-coin-container'>
        <div className='top-bar'>
          <Link to='/coins-list'>
            <BiLeftArrow />
          </Link>
          <div className='name'>
            <img src={coin.image.small} alt='coin-icon' />
            <p>{`${coin.name}  (${coin.symbol.toUpperCase()})`}</p>
          </div>
        </div>
        <div className='content'>
          <div className='details-column'>
            {/* First details column */}
            <div className='market-data'>
              <p>Price:</p>
              <p className='data'>
                $
                {parseFloat(coin.market_data.current_price.usd) > 10
                  ? parseFloat(coin.market_data.current_price.usd).toFixed(2)
                  : parseFloat(coin.market_data.current_price.usd).toFixed(6)}
              </p>
              <p>Market cap:</p>
              <p className='data'>${coin.market_data.market_cap.usd}</p>
              <p>Total volume:</p>
              <p className='data'>${coin.market_data.total_volume.usd}</p>
              <p>Highest price (ath): </p>
              <p className='data'>${coin.market_data.ath.usd}</p>
            </div>
          </div>

          {/* Second details column */}
          <div className='details-column'>
            <div className='market-data'>
              <p>Low 24h:</p>
              <p className='data'>
                $
                {parseFloat(coin.market_data.low_24h.usd) > 1
                  ? parseFloat(coin.market_data.low_24h.usd).toFixed(2)
                  : parseFloat(coin.market_data.low_24h.usd).toFixed(6)}
              </p>
              <p>High 24h:</p>
              <p className='data'>
                $
                {parseFloat(coin.market_data.high_24h.usd) > 10
                  ? parseFloat(coin.market_data.high_24h.usd).toFixed(2)
                  : parseFloat(coin.market_data.high_24h.usd).toFixed(6)}
              </p>
              <p>Change 24h (%):</p>
              <p
                className='data'
                style={
                  parseFloat(coin.market_data.price_change_percentage_24h) > 0
                    ? { color: greenColor }
                    : { color: redColor }
                }
              >
                {parseFloat(
                  coin.market_data.price_change_percentage_24h
                ).toFixed(2)}
                %
              </p>
              <p>Change 24h ($):</p>
              <p
                className='data'
                style={
                  parseFloat(coin.market_data.price_change_percentage_24h) > 0
                    ? { color: greenColor }
                    : { color: redColor }
                }
              >
                {parseFloat(coin.market_data.price_change_24h).toFixed(2)}$
              </p>
            </div>
          </div>
        </div>
        <div className='price-chart-container'>
          <div className='time-buttons'>
            <button
              style={days === 1 ? { background: '#ffffff15' } : {}}
              onClick={() => setDays(1)}
            >
              24h
            </button>
            <button
              style={days === 30 ? { background: '#ffffff15' } : {}}
              onClick={() => setDays(30)}
            >
              last 30 days
            </button>
            <button
              style={days === 365 ? { background: '#ffffff15' } : {}}
              onClick={() => setDays(365)}
            >
              last year
            </button>
          </div>
          <PriceChart coinId={coin.id} days={days} />
          <AddToPortfolio coin={coin} />
        </div>
      </div>
    )
  );
};

export default SingleCoin;
