import React, { useRef, useState } from 'react';
import { useFirebase } from '../../contexts/firebaseContext';
import { fireStore, timestamp } from '../../firebase/config';
import '../../styles/add-to-portfolio.scss';

const AddToPortfolio = ({ coin }) => {
  const quantityRef = useRef();
  const priceRef = useRef();
  const { user } = useFirebase();
  const [isError, setIsError] = useState({ quantity: false, boughtFor: false });
  const collectionRef = fireStore.collection('users').doc(user.uid);

  const handleAddToPortfolio = () => {
    const quantity = quantityRef.current.value;
    const boughtFor = priceRef.current.value;
    if (!quantity) return setIsError({ ...isError, quantity: true });
    if (!boughtFor) return setIsError({ ...isError, boughtFor: true });

    const coinData = {
      addedAt: timestamp(),
      coinName: coin.name,
      quantity,
      boughtFor,
    };

    collectionRef
      .collection('coins')
      .doc(coin.id)
      .set(coinData)
      .then(() => {
        console.log('saved in storage');
      })
      .catch((err) => {
        console.log('error with saving', err);
      });

    console.log(quantity, boughtFor);
  };
  console.log(coin);
  const handleFocus = () => {
    setIsError(false);
  };
  return (
    <div className='add-to-portfolio-container'>
      <p>Add coin to your portfolio</p>
      <div className='add-to-portfolio-form'>
        <div className='input-field'>
          <label htmlFor='quantity'>Quantity</label>
          <input
            onFocus={handleFocus}
            className={isError.quantity ? 'input-error' : ''}
            ref={quantityRef}
            type='number'
            step='any'
            name='quantity'
            placeholder={isError.quantity ? 'enter correct value' : ''}
          />
          <div className='quantity-buttons'>
            <button
              className='paste-input-btn'
              onClick={() => {
                if (quantityRef.current.value) {
                  quantityRef.current.value =
                    parseFloat(quantityRef.current.value) + 10;
                } else {
                  quantityRef.current.value = 10;
                }
              }}
            >
              10
            </button>
            <button
              className='paste-input-btn'
              onClick={() => {
                if (quantityRef.current.value) {
                  quantityRef.current.value =
                    parseFloat(quantityRef.current.value) + 100;
                } else {
                  quantityRef.current.value = 100;
                }
              }}
            >
              100
            </button>
            <button
              className='paste-input-btn'
              onClick={() => {
                if (quantityRef.current.value) {
                  quantityRef.current.value =
                    parseFloat(quantityRef.current.value) + 1000;
                } else {
                  quantityRef.current.value = 1000;
                }
              }}
            >
              100
            </button>
          </div>
        </div>
        <div className='input-field'>
          <label htmlFor='price'>Bought for</label>
          <input
            onFocus={handleFocus}
            className={isError.boughtFor ? 'input-error' : ''}
            ref={priceRef}
            type='number'
            step='any'
            name='price'
            placeholder={isError.boughtFor ? 'enter correct value' : ''}
          />
          <button
            className='paste-input-btn'
            onClick={() => {
              priceRef.current.value = coin.market_data.current_price.usd;
            }}
          >
            last price
          </button>
        </div>
        <button className='btn' onClick={handleAddToPortfolio}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddToPortfolio;
