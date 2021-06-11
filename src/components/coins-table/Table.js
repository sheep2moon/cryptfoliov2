import React from 'react';
import Row from './Row';
import '../../styles/coins-table.scss';

const Table = ({ coins }) => {
  return (
    <div className='coins-table-container'>
      <div className='coin-table-column-names table-grid'>
        <p>#</p>
        {/* placeholder for css grid */}
        <span></span>
        <p className='current-price'>price</p>
        <p>24h change</p>
        <p className='market-cap'>market cap</p>
      </div>
      <div className='rows-container'>
        {coins.map((coin, index) => (
          <Row key={coin.id} index={index} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default Table;
