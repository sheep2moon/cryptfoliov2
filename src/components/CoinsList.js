import React, { useEffect } from 'react';
import { useCrypto } from '../contexts/cryptoContext';
import Table from './coins-table/Table';
import '../styles/coins-list.scss';
const CoinsList = () => {
  const { allCoins } = useCrypto();
  console.log(allCoins);
  return (
    <div className='coins-list-container'>
      <h1>coinList</h1>
      <Table coins={allCoins} />
    </div>
  );
};

export default CoinsList;
