import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import Alert from '../Alert';
import EditModal from './EditModal';

const CoinsTable = ({ docs, coins }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editCoin, setEditCoin] = useState(null);
  const [alertText, setAlertText] = useState('');

  const handleEditButton = (coin) => {
    setIsEdit(true);
    setEditCoin(coin);
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
        <p>current price</p>
        <p>bought for</p>
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
              <img src={currentCoin.image} alt='' />
              <p className='name'>{currentCoin.symbol}</p>
              <p className='current-price'>${currentCoin.current_price}</p>
              <p className='bought-for'>${doc.boughtFor}</p>
              <p className='quantity'>{parseFloat(doc.quantity).toFixed(8)}</p>
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
              <button className='delete'>
                <RiDeleteBack2Fill />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoinsTable;
