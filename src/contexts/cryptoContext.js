import { createContext, useContext, useEffect, useState } from 'react';

const CryptoContext = createContext();

export const useCrypto = () => useContext(CryptoContext);

const api_url =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

const CryptoProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCoins = async () => {
    setIsLoading(true);
    const response = await fetch(api_url);
    const coins = await response.json();
    setAllCoins(coins);
    setIsLoading(false);
  };

  const getSingleCoin = (id) => {
    return allCoins.filter((coin) => coin.id === id)[0];
  };

  useEffect(() => {
    getCoins();
  }, []);

  const value = {
    allCoins,
    getSingleCoin,
  };

  return (
    <CryptoContext.Provider value={value}>
      {!isLoading && children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
