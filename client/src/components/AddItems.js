import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addNewItem, fetchItems } from '../redux/checkoutActions';
import './AddItems.css';

const AddItems = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemPicture, setItemPicture] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addItem = () => {
    if (itemName && itemPrice && itemPicture) {
      dispatch(addNewItem(itemName, itemPrice, itemPicture));
      setIsSuccess(true);
      setErrorMessage('');
      dispatch(fetchItems());
    } else {
      setIsSuccess(false);
      setErrorMessage('Please fill all the fields...');
    }
  };

  const createItemForm = (
    <div className='add__item'>
      <form onSubmit={handleSubmit} className='add__form'>
        {errorMessage ? <h2>{errorMessage}</h2> : null}
        <label className='add__label'>Item Name</label>
        <input
          className='add__input'
          type='text'
          required
          value={itemName}
          placeholder='Enter item name...'
          onChange={(e) => {
            setItemName(e.target.value);
            setErrorMessage('');
          }}
        />
        <label className='add__label'>Item Price</label>
        <input
          className='add__input'
          type='number'
          required
          value={itemPrice}
          placeholder='Enter item price...'
          onChange={(e) => {
            setItemPrice(e.target.value);
            setErrorMessage('');
          }}
        />
        <label className='add__label'>Item Picture</label>
        <input
          className='add__input'
          type='text'
          value={itemPicture}
          required
          placeholder='Enter item picture URL...'
          onChange={(e) => {
            setItemPicture(e.target.value);
            setErrorMessage('');
          }}
        />
        <button className='add__button' type='submit' onClick={addItem}>
          ADD ITEM
        </button>
      </form>
    </div>
  );

  return (
    <React.Fragment>
      {isSuccess ? <Redirect to='/' /> : createItemForm}
    </React.Fragment>
  );
};

export default AddItems;
