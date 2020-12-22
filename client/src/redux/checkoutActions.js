import myAxios from '../myAxios';
import {
  ADD_MORE_ITEMS,
  ADD_ORDER,
  ADD_PROMOTION,
  ADD_TO_CART,
  CLEAR_ORDER,
  FETCH_ITEMS,
  FETCH_ORDERS,
  REMOVE_FROM_CART,
  REMOVE_ITEM,
  REMOVE_MORE_ITEMS,
  REMOVE_PROMOTION,
} from './checkoutTypes';

export const fetchItems = () => (dispatch, getState) => {
  myAxios
    .get('/')
    .then((response) =>
      dispatch({ type: FETCH_ITEMS, payload: response.data })
    );
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const addToCart = (item) => (dispatch, getState) => {
  item.count = 1;
  dispatch({
    type: ADD_TO_CART,
    payload: item,
  });
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const removeFromCart = (item) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: item });
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const addNewItem = (itemName, itemPrice, itemPicture) => (
  dispatch,
  getState
) => {
  myAxios.post('/add', { itemName, itemPrice, itemPicture });
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const removeItem = (id) => (dispatch, getState) => {
  myAxios
    .delete('/delete/' + id)
    .then((response) => dispatch({ type: REMOVE_ITEM, payload: id }));
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const addMoreItems = (item) => (dispatch, getState) => {
  dispatch({ type: ADD_MORE_ITEMS, payload: item });
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const removeMoreItems = (item) => (dispatch, getState) => {
  dispatch({ type: REMOVE_MORE_ITEMS, payload: item });
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const addPromotion = (code = '') => (dispatch, getState) => {
  dispatch({ type: ADD_PROMOTION, payload: code });
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const removePromotion = (id = '', code = '') => (dispatch, getState) => {
  dispatch({ type: REMOVE_PROMOTION, payload: { id, code } });
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const clearOrder = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_ORDER });
  localStorage.setItem('cart', JSON.stringify(getState()));
};

export const addOrder = (email, address, cardNumber, total, orderItems) => (
  dispatch
) => {
  myAxios
    .post('/orders', { email, address, cardNumber, total, orderItems })
    .then((response) => dispatch({ type: ADD_ORDER, payload: response.data }));
};

export const fetchOrders = () => (dispatch) => {
  myAxios
    .get('/orders')
    .then((response) =>
      dispatch({ type: FETCH_ORDERS, payload: response.data })
    );
};
