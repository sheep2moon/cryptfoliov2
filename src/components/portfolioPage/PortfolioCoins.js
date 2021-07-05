import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { useFirebase } from '../../contexts/firebaseContext';
import { fireStore } from '../../firebase/config';
import Alert from '../Alert';
import EditModal from './EditModal';
import { Link } from 'react-router-dom';

const PortfolioCoins = ({ docs, coins }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editCoin, setEditCoin] = useState(null);
  const [alertText, setAlertText] = useState('');
  const { user } = useFirebase();
  const collectionRef = fireStore.collection('users').doc(user.uid);

  const handleEditButton = (coin) => {
    setIsEdit(true);
    setEditCoin(coin);
  };
  const handleDelete = (id) => {
    collectionRef.collection('coins').doc(id).delete();
  };

  return (
    <div className='portfolio-list'>
      {isEdit && (
        <EditModal
          setIsEdit={setIsEdit}
          coin={editCoin}
          setAlertText={setAlertText}
        />
      )}
      <Alert text={alertText} />
      <div className='column-names'>
        <span></span>
        <p className='name'>coin</p>
        <p className='current-price'>current price</p>
        <p className='bought-for'>bought for</p>
        <p>quantity</p>
        <p>profit</p>
        <p className='controls'>edit</p>
        <p className='controls'>delete</p>
      </div>
      <div className='rows'>
        {docs.map((doc) => {
          const currentCoin = coins.find((coin) => coin.id === doc.id);
          const priceDiff =
            parseFloat(currentCoin.current_price) * parseFloat(doc.quantity) -
            parseFloat(doc.boughtFor) * parseFloat(doc.quantity);

          return (
            <div className='row' key={doc.id}>
              <img src={currentCoin.image} alt='coin icon' />
              <Link to={`/coin/${doc.id}`}>
                <p className='name'>{currentCoin.symbol}</p>
              </Link>
              <p className='current-price'>${currentCoin.current_price}</p>
              <p className='bought-for'>${doc.boughtFor}</p>
              <p className='quantity'>
                {parseFloat(doc.quantity) > 10
                  ? parseFloat(doc.quantity).toFixed(4)
                  : parseFloat(doc.quantity).toFixed(8)}
              </p>
              <p
                className={
                  priceDiff > 0 ? 'profit price-green' : 'profit price-red'
                }
              >
                ${priceDiff.toFixed(3)}
              </p>
              <button className='edit' onClick={() => handleEditButton(doc)}>
                <AiFillEdit />
              </button>
              <button className='delete' onClick={() => handleDelete(doc.id)}>
                <RiDeleteBack2Fill />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioCoins;
