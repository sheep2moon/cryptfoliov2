import React, { useEffect, useRef, useState } from 'react';
import { useCrypto } from '../contexts/cryptoContext';
import Table from './coins-table/Table';
import '../styles/coins-list.scss';

const CoinsList = () => {
  const { allCoins } = useCrypto();
  const [filteredCoins, setFilteredCoins] = useState(allCoins);

  const handleSearch = (e) => {
    const newCoins = allCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCoins(newCoins);
  };

  return (
    <div className='coins-list-container'>
      <div className='search-container'>
        <input
          onChange={(e) => handleSearch(e)}
          type='text'
          name='search-box'
          placeholder='search for coin'
        />
      </div>
      <Table coins={filteredCoins} />
    </div>
  );
};

export default CoinsList;
