import React from 'react';

const CoinsTable = ({ docs, coins }) => {
  console.log(docs, coins);
  return (
    <div>
      <div className='column-names'></div>
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
