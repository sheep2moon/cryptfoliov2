import React, { useState } from 'react';
import { useCrypto } from '../../contexts/cryptoContext';
import { useFirebase } from '../../contexts/firebaseContext';
import useFirestore from '../../firebase/useFirestore';
import { fireStore } from '../../firebase/config';
import PortfolioCoins from './PortfolioCoins';
import '../../styles/portfolio.scss';
import Summary from './Summary';
import Chart from './Chart';
import { Link } from 'react-router-dom';
import backgroundImage from '../../img/background.svg';

const Portfolio = () => {
  const { user } = useFirebase();
  const { allCoins } = useCrypto();
  const { docs } = useFirestore(user.uid, 'coins');
  const collectionRef = fireStore.collection('users').doc(user.uid);
  const [chartData, setChartData] = useState();

  console.log(docs);
  return (
    <div
      className='main-container'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {docs.length ? (
        <div className='portfolio-container'>
          <div className='wallet-stats'>
            {chartData && <Chart data={chartData} />}
            <Summary docs={docs} coins={allCoins} setChartData={setChartData} />
          </div>

          {allCoins && (
            <PortfolioCoins
              coins={allCoins}
              docs={docs}
              setChartData={setChartData}
            />
          )}
        </div>
      ) : (
        <div className='flex-center'>
          <h1>your portfolio is empty</h1>
          <Link to='/coins-list'>
            <button className='btn'>Browse coins</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
