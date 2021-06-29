import React from 'react';
import { Link } from 'react-router-dom';

const Row = ({ coin, index }) => {
  return (
    <div className='coin-table-row table-grid'>
      <Link to={`/coin/${coin.id}`} className='single-coin-link' />
      <p className='index'>{index + 1}</p>
      <div className='name'>
        <img src={coin.image} alt='coin-icon' />
        <p>{coin.name}</p>
      </div>

      <p className='current-price'>
        $
        {parseFloat(coin.current_price) > 1
          ? parseFloat(coin.current_price).toFixed(2)
          : parseFloat(coin.current_price).toFixed(4)}
      </p>
      <p
        className={
          parseFloat(coin.price_change_percentage_24h).toFixed(2) > 0
            ? 'percentage-change price-green'
            : 'percentage-change price-red'
        }
      >
        {parseFloat(coin.price_change_percentage_24h).toFixed(2)}%
      </p>
      <p className='market-cap'>${coin.market_cap}</p>
    </div>
  );
};

export default Row;
