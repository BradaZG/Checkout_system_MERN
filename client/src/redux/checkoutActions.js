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

export const fetchItems = () => (dispatch) => {
  myAxios
    .get('/')
    .then((response) =>
      dispatch({ type: FETCH_ITEMS, payload: response.data })
    );
};

export const addToCart = (item) => (dispatch) => {
  item.count = 1;
  dispatch({
    type: ADD_TO_CART,
    payload: item,
  });
};

export const removeFromCart = (item) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: item });
};

export const addNewItem = (itemName, itemPrice, itemPicture) => (dispatch) => {
  myAxios.post('/add', { itemName, itemPrice, itemPicture });
};

export const removeItem = (id) => (dispatch) => {
  myAxios
    .delete('/delete/' + id)
    .then((response) => dispatch({ type: REMOVE_ITEM, payload: id }));
};

export const addMoreItems = (item) => (dispatch) => {
  dispatch({ type: ADD_MORE_ITEMS, payload: item });
};

export const removeMoreItems = (item) => (dispatch) => {
  dispatch({ type: REMOVE_MORE_ITEMS, payload: item });
};

export const addPromotion = (code = '') => (dispatch) => {
  dispatch({ type: ADD_PROMOTION, payload: code });
};

export const removePromotion = (id = '', code = '') => (dispatch) => {
  dispatch({ type: REMOVE_PROMOTION, payload: { id, code } });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
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
