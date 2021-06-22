import React from 'react';
import { useCrypto } from '../../contexts/cryptoContext';
import { useFirebase } from '../../contexts/firebaseContext';
import useFirestore from '../../firebase/useFirestore';
import { fireStore } from '../../firebase/config';
import CoinsTable from './CoinsTable';
import '../../styles/portfolio.scss';

const Portfolio = () => {
  const { user } = useFirebase();
  const { allCoins } = useCrypto();
  const { docs } = useFirestore(user.uid, 'coins');
  const collectionRef = fireStore.collection('users').doc(user.uid);

  console.log(docs);
  return (
    <div className='main-container'>
      <div className='portfolio-container'>
        <div className='wallet-stats'>
          <div className='chart'>chart</div>
          <div className='overview'>overview</div>
        </div>

        {allCoins && <CoinsTable coins={allCoins} docs={docs} />}
      </div>
    </div>
  );
};

export default Portfolio;
