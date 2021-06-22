import React from 'react';

const CoinsTable = ({ docs, coins }) => {
  console.log(docs, coins);
  return (
    <div className='portfolio-list'>
      <div className='column-names'>
        <span></span>
        <p>symbol</p>
        <p>current price</p>
        <p>bought for</p>
        <p>quantity</p>
        <p>profit</p>
        <p>edit</p>
        <p>delete</p>
      </div>
      <div className='rows'>
        {docs.map((doc) => {
          const currentCoin = coins.find((coin) => coin.id === doc.id);
          return (
            <div className='row' key={doc.id}>
              <img src={currentCoin.image} alt='' />
              <p>{currentCoin.symbol}</p>
              <p>${currentCoin.current_price}</p>
              <p>${doc.boughtFor}</p>
              <p>{doc.quantity}</p>
              <p>profit</p>
              <button>edit</button>
              <button>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoinsTable;
