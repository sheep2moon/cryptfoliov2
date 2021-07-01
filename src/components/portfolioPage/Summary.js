import React, { useEffect, useState } from 'react';

const Summary = ({ docs, coins }) => {
  const [walletValue, setWalletValue] = useState(0);
  const [walletProfit, setWalletProfit] = useState(0);
  const [walletChange, setWalletChange] = useState(0);
  const [mostProfitableCoin, setMostProfitableCoin] = useState({});
  useEffect(() => {
    let totalValue = 0;
    let coinProfit = { value: 0, id: '' };
    let totalProfit = 0;
    let walletChange = 0;
    docs.forEach((doc) => {
      const currentCoin = coins.find((coin) => coin.id === doc.id);
      console.log(doc, currentCoin);
      totalValue +=
        parseFloat(currentCoin.current_price) * parseFloat(doc.quantity);

      const profit =
        parseFloat(currentCoin.current_price) * parseFloat(doc.quantity) -
        parseFloat(doc.boughtFor) * parseFloat(doc.quantity);
      if (profit > coinProfit.value) {
        coinProfit.value = profit;
        coinProfit.id = doc.id;
      }
      totalProfit += profit;
      walletChange +=
        parseFloat(currentCoin.price_change_24h) * parseFloat(doc.quantity);
    });
    setWalletValue(totalValue);
    setWalletProfit(totalProfit);
    setMostProfitableCoin(coinProfit);
    setWalletChange(walletChange);
  }, [coins, docs]);

  return (
    <div className='summary-container'>
      <div className='card'>total value: {walletValue}</div>
      <div className='card'>total profit: {walletProfit}</div>
      <div className='card'>
        most profitable coin: {mostProfitableCoin.id} :{' '}
        {mostProfitableCoin.value}
      </div>
      <div className='card'>24h wallet change: {walletChange}</div>
    </div>
  );
};

export default Summary;
