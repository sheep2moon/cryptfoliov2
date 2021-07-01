import React, { useEffect, useState } from 'react';

const Summary = ({ docs, coins }) => {
  const [walletValue, setWalletValue] = useState(0);
  const [walletProfit, setWalletProfit] = useState(0);
  const [walletChange, setWalletChange] = useState(0);
  const [mostProfitableCoin, setMostProfitableCoin] = useState({});
  useEffect(() => {
    let totalValue = 0;
    let coinProfit = { value: 0, name: '', image: '' };
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
        coinProfit.name = doc.coinName;
        coinProfit.img = currentCoin.image;
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
      <div className='summary'>
        <div className='card'>
          <p className='card-title'>Portfolio value:</p>
          <p>{walletValue.toFixed(2)}$</p>
        </div>
        <div className='card'>
          <p className='card-title'>Profit:</p>
          <p>{walletProfit.toFixed(2)}$</p>
        </div>
        <div className='card'>
          <p className='card-title'>Most profitable coin:</p>
          <div className='card-coin'>
            <img src={mostProfitableCoin.img} alt='' />
            <p className='name'>{mostProfitableCoin.name}</p>
            <p>{mostProfitableCoin.value.toFixed(2)}$</p>
          </div>
        </div>
        <div className='card'>
          <p className='card-title'>24h change:</p>
          <p>{walletChange.toFixed(2)}$</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
