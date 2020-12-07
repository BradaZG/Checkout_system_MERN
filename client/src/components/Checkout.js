import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, addOrder, addPromotion } from '../redux/checkoutActions';
import { Redirect } from 'react-router-dom';

import './Checkout.css';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from '../utils';
import PromoCodes from './PromoCodes';
import OpenModal from './OpenModal';

const Checkout = () => {
  const [email, setEmail] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [card, setCard] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const { cardNumber, name, expiry, cvc } = card;
  const [order, setOrder] = useState(false);
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const totalDiscounts = useSelector((state) => state.totalDiscounts);
  const motionDiscount = useSelector((state) => state.motionDiscount);
  const smokeDiscount = useSelector((state) => state.smokeDiscount);
  const orderItems = useSelector((state) => state.orderItems);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addPromotion());
  }, [dispatch]);

  const addNewOrder = () => {
    if (total) {
      if (email && address && cardNumber && name && expiry && cvc) {
        dispatch(
          addOrder(
            email,
            address,
            parseInt(cardNumber.replace(/\s/g, '')),
            total - totalDiscounts - motionDiscount - smokeDiscount,
            orderItems
          )
        );
        setErrorMessage('');
        setIsOpen(true);
      } else {
        setErrorMessage('Please fill all the fields...');
      }
    } else {
      setErrorMessage('Add some items to the basket...');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'cardNumber') {
      e.target.value = formatCreditCardNumber(e.target.value);
    } else if (e.target.name === 'expiry') {
      e.target.value = formatExpirationDate(e.target.value);
    } else if (e.target.name === 'cvc') {
      e.target.value = formatCVC(e.target.value);
    }
    setErrorMessage('');
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    dispatch(clearOrder());
    setIsOpen(false);
    setOrder(true);
  };

  const createCheckoutForm = (
    <div className='add__item'>
      <form onSubmit={handleSubmit} className='add__form'>
        {errorMessage ? <h2>{errorMessage}</h2> : null}
        <label className='add__label'>Email</label>
        <input
          className='add__input'
          type='email'
          required
          name='email'
          value={email}
          placeholder='Enter email...'
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage('');
          }}
        />
        <label className='add__label'>Address</label>
        <input
          className='add__input'
          type='text'
          required
          name='address'
          value={address}
          placeholder='Enter address...'
          onChange={(e) => {
            setAddress(e.target.value);
            setErrorMessage('');
          }}
        />
        <div key='Payment'>
          <div className='App-payment'>
            <label className='add__label'>Credit Card Details</label>
            <div className='form-group'>
              <input
                type='tel'
                name='cardNumber'
                value={cardNumber}
                className='add__input'
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                required
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                name='name'
                value={name}
                className='add__input'
                placeholder='Name'
                required
                onChange={handleInputChange}
              />
            </div>
            <div className='row'>
              <div className='col-6'>
                <input
                  type='tel'
                  name='expiry'
                  value={expiry}
                  className='add__input'
                  placeholder='Valid Thru'
                  pattern='\d\d/\d\d'
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className='col-6'>
                <input
                  type='tel'
                  name='cvc'
                  value={cvc}
                  className='add__input'
                  placeholder='CVC'
                  pattern='\d{3,4}'
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button className='add__button' type='submit' onClick={addNewOrder}>
          COMPLETE ORDER
        </button>
      </form>
      <PromoCodes />
      {!order && (
        <OpenModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      )}
    </div>
  );

  return (
    <React.Fragment>
      {order ? <Redirect to='/' /> : createCheckoutForm}
    </React.Fragment>
  );
};

export default Checkout;
