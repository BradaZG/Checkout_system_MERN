import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  removeItem,
} from '../redux/checkoutActions';
import './Item.css';

const Item = ({ item }) => {
  const orderItem = useSelector((state) => state.orderItems);
  const dispatch = useDispatch();

  const inCart = orderItem.filter((el) => el._id === item._id).length;

  const addItem = () => {
    dispatch(addToCart(item));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className='items'>
      <img className='items__picture' src={item.itemPicture} alt={item.name} />

      <div>
        <h4>{item.itemName}</h4>
        <h4 className='items__price'>€ {item.itemPrice}</h4>
        <button
          className='remove__btn'
          onClick={() => dispatch(removeItem(item._id))}
        >
          Remove Item
        </button>
      </div>
      <div>
        {inCart ? (
          <button className='btn rm__btn' onClick={handleRemove}>
            Remove from cart
          </button>
        ) : (
          <button onClick={addItem} className='btn add__btn'>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Item;
