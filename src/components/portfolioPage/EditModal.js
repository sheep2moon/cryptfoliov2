import React, { useRef, useState } from 'react';
import { useFirebase } from '../../contexts/firebaseContext';
import { fireStore, timestamp } from '../../firebase/config';

const EditModal = ({ setIsEdit, coin, setAlertText }) => {
  const quantityRef = useRef();
  const priceRef = useRef();
  const [isError, setIsError] = useState({ quantity: false, price: false });
  const { user } = useFirebase();
  const collectionRef = fireStore.collection('users').doc(user.uid);
  const handleClose = (e) => {
    if (e.target.classList.contains('edit-modal-container')) setIsEdit(false);
  };
  const handleConfirm = () => {
    const quantity = quantityRef.current.value;
    const price = priceRef.current.value;

    if (!quantity || quantity <= 0)
      return setIsError({ ...isError, quantity: true });
    if (!price || price <= 0) return setIsError({ ...isError, price: true });

    const newData = {
      ...coin,
      addedAt: timestamp(),
      quantity,
      boughtFor: price,
    };
    collectionRef
      .collection('coins')
      .doc(coin.id)
      .set(newData)
      .then(() => {
        setAlertText('succesfully edited');
        setTimeout(() => {
          setAlertText('');
        }, 3000);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputFocus = () => {
    setIsError(false);
  };

  return (
    <div className='edit-modal-container' onClick={handleClose}>
      <div className='edit-modal'>
        <button className='close-button' onClick={() => setIsEdit(false)}>
          X
        </button>
        <h2>{coin.coinName}</h2>
        <div className='input-field'>
          <label htmlFor='quantity'>Quantity</label>
          <input
            className={isError.quantity ? 'input-error' : ''}
            type='number'
            name='quantity'
            step='any'
            ref={quantityRef}
            onFocus={handleInputFocus}
            defaultValue={parseFloat(coin.quantity)}
            placeholder={isError.quantity ? 'enter correct value' : ''}
          />
        </div>
        <div className='input-field'>
          <label htmlFor='price'>Bought For</label>
          <input
            type='number'
            name='price'
            step='any'
            ref={priceRef}
            onFocus={handleInputFocus}
            defaultValue={parseFloat(coin.boughtFor)}
            placeholder={isError.quantity ? 'enter correct value' : ''}
          />
        </div>
        <button className='btn' onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default EditModal;
