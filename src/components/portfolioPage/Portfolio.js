import React from 'react';
import { useCrypto } from '../../contexts/cryptoContext';
import { useFirebase } from '../../contexts/firebaseContext';
import useFirestore from '../../firebase/useFirestore';
import { fireStore } from '../../firebase/config';
import CoinsTable from './CoinsTable';
import '../../styles/portfolio.scss';
import Summary from './Summary';

const Portfolio = () => {
  const { user } = useFirebase();
  const { allCoins } = useCrypto();
  const { docs } = useFirestore(user.uid, 'coins');
  const collectionRef = fireStore.collection('users').doc(user.uid);

  return (
    <div className='main-container'>
      <div className='portfolio-container'>
        <div className='wallet-stats'>
          <div className='chart'>chart</div>
          <Summary docs={docs} coins={allCoins} />
        </div>

        {allCoins && <CoinsTable coins={allCoins} docs={docs} />}
      </div>
    </div>
  );
};

export default Portfolio;
