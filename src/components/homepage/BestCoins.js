import React from 'react';
import { useCrypto } from '../../contexts/cryptoContext';
import { Link } from 'react-router-dom';

const BestCoins = () => {
  const { allCoins } = useCrypto();
  console.log(allCoins);
  return (
    <div className='best-coins'>
      {allCoins
        .slice(0, 5)
        .filter((coin) => coin.id !== 'tether')
        .map((coin) => (
          <Link key={coin.id} to={`/coin/${coin.id}`}>
            <div className='coin-card'>
              <div className='left-col'>
                <img src={coin.image} alt='' />
                <div className='col-text'>
                  <div className='name'>
                    <p className='symbol'>{coin.symbol.toUpperCase()}</p>
                    <p className='currency'>/USD</p>
                  </div>
                  <p className='price'>{coin.current_price.toFixed(2)}</p>
                </div>
                <div className='col-text'></div>
              </div>
              <div className='right-col'>
                <p
                  className={
                    parseFloat(coin.price_change_percentage_24h) > 0
                      ? 'price-green'
                      : 'price-red'
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p
                  className={
                    parseFloat(coin.price_change_24h) > 0
                      ? 'price-green'
                      : 'price-red'
                  }
                >
                  {coin.price_change_24h.toFixed(3)}$
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BestCoins;
