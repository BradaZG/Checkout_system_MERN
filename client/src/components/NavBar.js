import React from 'react';
import './NavBar.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const cartItems = useSelector((state) => state.cartItems);

  return (
    <nav>
      <div className='nav__bar'>
        <Link to='/' style={{ width: '70%' }}>
          <h3>Checkout System</h3>
        </Link>
        <div className='nav__links'>
          <Link to='/'>
            <h4>Home</h4>
          </Link>
          <Link to='/add'>
            <h4>Add Item</h4>
          </Link>
        </div>
        <div className='nav__container'>
          <Link to='/basket'>
            <ShoppingCartIcon style={{ color: 'white', fontSize: '2.70rem' }} />
          </Link>
          <div className='nav__amount--container'>
            <p className='nav__amount'>{cartItems}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
