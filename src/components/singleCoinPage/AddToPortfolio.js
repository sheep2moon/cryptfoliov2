import React, { useRef } from 'react';
import '../../styles/add-to-portfolio.scss';

const AddToPortfolio = ({ coin }) => {
  const quantityRef = useRef();
  const priceRef = useRef();

  const handleAddToPortfolio = () => {
    const quantity = quantityRef.current.value;
    const boughtFor = quantityRef.current.value;
    console.log(quantity, boughtFor);
  };

  return (
    <div className='add-to-portfolio-container'>
      <p>Add coin to your portfolio</p>
      <div className='add-to-portfolio-form'>
        <div className='input-field'>
          <label htmlFor='quantity'>Quantity</label>
          <input ref={quantityRef} type='number' name='quantity' />
        </div>
        <div className='input-field'>
          <label htmlFor='price'>Bought for</label>
          <input ref={priceRef} type='number' name='price' />
        </div>
        <button className='btn' onClick={handleAddToPortfolio}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddToPortfolio;
