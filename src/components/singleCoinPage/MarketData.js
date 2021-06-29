import React from 'react';

const MarketData = ({ coin }) => {
  return (
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
            className={
              parseFloat(coin.market_data.price_change_percentage_24h) > 0
                ? 'data price-green'
                : 'data price-red'
            }
          >
            {parseFloat(coin.market_data.price_change_percentage_24h).toFixed(
              2
            )}
            %
          </p>
          <p>Change 24h ($):</p>
          <p
            className={
              parseFloat(coin.market_data.price_change_percentage_24h) > 0
                ? 'data price-green'
                : 'data price-red'
            }
          >
            {parseFloat(coin.market_data.price_change_24h).toFixed(2)}$
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketData;
