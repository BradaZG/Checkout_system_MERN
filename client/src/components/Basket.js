import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Basket.css';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
  addMoreItems,
  removeFromCart,
  removeMoreItems,
} from '../redux/checkoutActions';

import { Link } from 'react-router-dom';

const Basket = () => {
  const itemsInBasket = useSelector((state) => state.orderItems);
  const total = useSelector((state) => state.total);
  const dispatch = useDispatch();

  const removeItem = (item, price) => {
    if (item.count === 1) {
      dispatch(removeFromCart(item._id, price));
    } else {
      dispatch(removeMoreItems(item));
    }
  };

  const addItem = (item) => {
    dispatch(addMoreItems(item));
  };

  return (
    <div>
      <section className='basket__container'>
        <h2>YOUR BASKET</h2>
        {itemsInBasket.map((item) => (
          <div key={item._id} className='items'>
            <img
              className='items__picture'
              src={item.itemPicture}
              alt={item.name}
            />

            <div>
              <h4>{item.itemName}</h4>
              <h4 className='items__price'>
                € {item.itemPrice} x {item.count}
              </h4>
            </div>
            <div className='items__buttons'>
              <button onClick={() => addItem(item)}>
                <KeyboardArrowUpIcon />
              </button>
              <h5>{item.count}</h5>
              <button onClick={() => removeItem(item, item.itemPrice)}>
                <KeyboardArrowDownIcon />
              </button>
            </div>
          </div>
        ))}
        <hr />
        <br />
        <h3 style={{ textAlign: 'right' }}>
          TOTAL: {Number(Math.round(parseFloat(total + 'e' + 2)) + 'e-' + 2)} €
        </h3>
        {total ? (
          <Link to='/orders' style={{ textAlign: 'center' }}>
            <button className='basket__checkout'>CHECKOUT</button>
          </Link>
        ) : (
          <Link to='/' style={{ textAlign: 'center' }}>
            <button className='basket__checkout'>ADD ITEMS</button>
          </Link>
        )}
      </section>
    </div>
  );
};

export default Basket;
