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

const initialState = {
  items: [],
  loading: true,
  cartItems: 0,
  orderItems: [],
  total: Number(0),
  promotions: [],
  orders: [],
  totalDiscounts: 0,
  motionDiscount: 0,
  smokeDiscount: 0,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload, loading: false };
    case FETCH_ORDERS:
      return { ...state, orders: action.payload };
    case ADD_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };
    case ADD_TO_CART:
      return {
        ...state,
        total:
          Number(Math.round(parseFloat(state.total + 'e' + 2)) + 'e-' + 2) +
          action.payload.itemPrice,
        cartItems: state.cartItems + 1,
        orderItems: [...state.orderItems, action.payload],
      };
    case ADD_MORE_ITEMS:
      let addPrice = 0;
      let totalMotion = state.motionDiscount;
      let totalSmoke = state.smokeDiscount;

      state.orderItems.map((item) => {
        if (item._id === action.payload._id) {
          item.count++;
          addPrice = item.itemPrice;
        }
        if (
          item.itemName === 'Motion Sensor' &&
          item.count % 3 === 0 &&
          item._id === action.payload._id
        ) {
          totalMotion = (9.97 * item.count) / 3;
        }
        if (
          item.itemName === 'Smoke Sensor' &&
          item.count % 2 === 0 &&
          item._id === action.payload._id
        ) {
          totalSmoke = (4.98 * item.count) / 2;
        }
        return null;
      });

      return {
        ...state,
        total:
          Number(Math.round(parseFloat(state.total + 'e' + 2)) + 'e-' + 2) +
          Number(Math.round(parseFloat(addPrice + 'e' + 2)) + 'e-' + 2),
        motionDiscount: totalMotion,
        smokeDiscount: totalSmoke,
      };
    case REMOVE_MORE_ITEMS:
      let rmPrice = 0;
      let totalMotionRm = 0;
      let totalSmokeRm = 0;
      state.orderItems.map((item) => {
        if (item._id === action.payload._id) {
          item.count--;
          rmPrice = item.itemPrice;
        }
        if (
          item.itemName === 'Motion Sensor' &&
          (item.count + 1) % 3 === 0 &&
          item.count > 0 &&
          item._id === action.payload._id
        ) {
          totalMotionRm =
            ((item.count + 1) / 3) * 9.97 - 9.97 * Math.floor(item.count / 3);
        }
        if (
          item.itemName === 'Smoke Sensor' &&
          (item.count + 1) % 2 === 0 &&
          item.count > 0 &&
          item._id === action.payload._id
        ) {
          totalSmokeRm =
            ((item.count + 1) / 2) * 4.98 - 4.98 * Math.floor(item.count / 2);
        }
        return null;
      });
      return {
        ...state,
        total:
          Number(Math.round(parseFloat(state.total + 'e' + 2)) + 'e-' + 2) -
          Number(Math.round(parseFloat(rmPrice + 'e' + 2)) + 'e-' + 2),
        motionDiscount: state.motionDiscount - totalMotionRm,
        smokeDiscount: state.smokeDiscount - totalSmokeRm,
      };
    case REMOVE_FROM_CART:
      if (state.orderItems.length === 1) {
        state.promotions = [];
        state.totalDiscounts = 0;
      }
      let itemCount = 0;
      state.orderItems.map((item) => {
        if (item.itemName === action.payload.itemName) {
          itemCount = item.count;
        }
        if (action.payload.itemName === 'Motion Sensor') {
          state.motionDiscount = 0;
        }
        if (action.payload.itemName === 'Smoke Sensor') {
          state.smokeDiscount = 0;
        }
        return itemCount;
      });

      return {
        ...state,
        cartItems: state.cartItems - 1,
        orderItems: state.orderItems.filter(
          (item) => item._id !== action.payload._id
        ),
        total:
          Number(Math.round(parseFloat(state.total + 'e' + 2)) + 'e-' + 2) -
          action.payload.itemPrice * itemCount,
      };
    case ADD_PROMOTION:
      let addDiscount = state.totalDiscounts;
      let totalAmountAdd = state.total;
      if (state.promotions.some((el) => el.code === '20%OFF')) {
        addDiscount = totalAmountAdd * 0.2;
      }
      if (
        state.promotions.some((el) => el.code === '5%OFF') &&
        state.promotions.some((el) => el.code === '20EUROFF')
      ) {
        addDiscount = totalAmountAdd * 0.05 + 20;
      } else if (state.promotions.some((el) => el.code === '5%OFF')) {
        addDiscount = totalAmountAdd * 0.05;
      }
      if (action.payload.code === '20%OFF') {
        addDiscount = totalAmountAdd * 0.2;
      }
      if (action.payload.code === '5%OFF') {
        if (state.totalDiscounts === 20) {
          addDiscount = 20 + totalAmountAdd;
        }
        if (state.totalDiscounts === 0) {
          addDiscount = totalAmountAdd * 0.05;
        }
      }
      if (action.payload.code === '20EUROFF') {
        if (state.totalDiscounts === totalAmountAdd * 0.05) {
          addDiscount = 20 + totalAmountAdd * 0.05;
        }
        if (state.totalDiscounts === 0) {
          addDiscount = 20;
        }
      }
      let addProm = state.promotions;
      if (action.payload) {
        addProm = [...state.promotions, action.payload];
      }

      return {
        ...state,
        promotions: addProm,
        totalDiscounts: addDiscount,
      };
    case REMOVE_PROMOTION:
      let removeDiscount = state.totalDiscounts;
      let totalAmountRem = state.total;
      if (action.payload.code === '20%OFF') {
        removeDiscount = 0;
      }
      if (action.payload.code === '5%OFF') {
        if (state.totalDiscounts === 20 + totalAmountRem * 0.05) {
          removeDiscount = 20;
        }
        if (state.totalDiscounts === totalAmountRem * 0.05) {
          removeDiscount = 0;
        }
      }
      if (action.payload.code === '20EUROFF') {
        if (state.totalDiscounts === totalAmountRem * 0.05 + 20) {
          removeDiscount = totalAmountRem * 0.05;
        }
        if (state.totalDiscounts === 20) {
          removeDiscount = 0;
        }
      }
      let rmProm = state.promotions;
      if (action.payload) {
        rmProm = state.promotions.filter(
          (promotion) => promotion.id !== action.payload.id
        );
      }

      return {
        ...state,
        promotions: rmProm,
        totalDiscounts: removeDiscount,
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case CLEAR_ORDER:
      return initialState;
    default:
      return state;
  }
};

export default checkoutReducer;
