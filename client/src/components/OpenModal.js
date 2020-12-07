import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

const OpenModal = ({ modalIsOpen, closeModal }) => {
  const orders = useSelector((state) => state.orders);

  return (
    <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>
      <button className='close__modal' onClick={closeModal}>
        x
      </button>
      <div className='order-details'>
        <h3 className='success-message'>Your order has been placed.</h3>
        <br />
        {orders.map((order) => (
          <div key={order._id}>
            <h2>Order nr. {order._id}</h2>
            <br />
            <ul>
              <li>
                <div>
                  <strong>Email:</strong>
                </div>
                <div>{order.email}</div>
              </li>
              <li>
                <div>
                  <strong>Address:</strong>
                </div>
                <div>{order.address}</div>
              </li>
              <li>
                <div>
                  <strong>Date:</strong>
                </div>
                <div>
                  {new Date(order.createdAt).toLocaleString('de-DE', {
                    hour12: false,
                  })}
                </div>
              </li>
              <li>
                <div>
                  <strong>Total:</strong>
                </div>
                <div>
                  €{' '}
                  {Number(
                    Math.round(parseFloat(order.total + 'e' + 2)) + 'e-' + 2
                  )}
                </div>
              </li>
              <li>
                <div>
                  <strong>Cart Items:</strong>
                </div>
                <div>
                  {order.orderItems.map((item) => (
                    <div key={item._id}>
                      {item.count} {' x '} {item.itemName}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default OpenModal;
