import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri';

const CoinsTable = ({ docs, coins }) => {
  console.log(docs, coins);

  return (
    <div className='portfolio-list'>
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
          console.log(currentCoin);
          console.log(doc);
          const priceDiff =
            parseFloat(currentCoin.current_price) - parseFloat(doc.boughtFor);
          console.log(priceDiff);
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
              <button className='edit'>
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
