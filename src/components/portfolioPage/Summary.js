import React, { useEffect, useState } from 'react';

const Summary = ({ docs, coins, setChartData }) => {
  const [walletValue, setWalletValue] = useState(0);
  const [walletProfit, setWalletProfit] = useState(0);
  const [walletChange, setWalletChange] = useState(0);
  const [mostProfitableCoin, setMostProfitableCoin] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let totalValue = 0;
    let coinProfit = { value: 0, name: '', image: '' };
    let totalProfit = 0;
    let walletChange = 0;
    let chartData = [];
    docs.forEach((doc) => {
      const currentCoin = coins.find((coin) => coin.id === doc.id);
      console.log(doc, currentCoin);
      const coinValue =
        parseFloat(currentCoin.current_price) * parseFloat(doc.quantity);
      totalValue += coinValue;

      chartData.push({ name: doc.id, value: coinValue });

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
    setChartData(chartData);
    setIsLoading(false);
  }, [coins, docs, setChartData]);

  return (
    <div className='summary-container'>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div className='stats'>
          <h1>Portfolio stats</h1>
          <div className='summary'>
            <div className='card'>
              <p className='card-title'>Portfolio value:</p>
              <p>{walletValue.toFixed(2)}$</p>
            </div>
            <div className='card'>
              <p className='card-title'>Profit:</p>
              <p className={walletProfit > 0 ? 'price-green' : 'price-red'}>
                {walletProfit.toFixed(2)}$
              </p>
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
              <p className={walletChange > 0 ? 'price-green' : 'price-red'}>
                {walletChange.toFixed(2)}$
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
