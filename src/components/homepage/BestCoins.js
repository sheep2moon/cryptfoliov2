import React from 'react';
import { useCrypto } from '../../contexts/cryptoContext';

const BestCoins = () => {
  const { allCoins } = useCrypto();
  console.log(allCoins);
  return (
    <div className='best-coins'>
      {allCoins
        .slice(0, 5)
        .filter((coin) => coin.id !== 'tether')
        .map((coin) => (
          <div key={coin.id} className='coin-card'>
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
                {coin.price_change_percentage_24h}%
              </p>
              <p
                className={
                  parseFloat(coin.price_change_24h) > 0
                    ? 'price-green'
                    : 'price-red'
                }
              >
                {coin.price_change_24h}$
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BestCoins;
