import {
  SO_SET_ORDERS_BOARD_COLLAPSE,
  SO_SET_ORDER_COLLAPSE,
  SO_SELECTING_GOODS_QUANTITY,
  SO_ADD_GOODS_TO_ORDER,
  SO_SET_ORDER_STATUS,
  SO_CREATE_ORDER,
  SO_DELETE_ORDER,
  SO_DELETE_ORDER_GOODS,
  SO_SET_ORDER_GOODS_QUANTITY } from './actionType';

let ORDER_ID_SEED = 0;// order id seed
const currentOrder = 0; // 当前正在编辑的order
const order = {
  id: '',
  status: '',
  goods: [],
};
const mockOrders = {
  1: {
    ...mockOrder,
  },
  2: {
    ...mockOrder,
  },
};

const createOrder = (state) => {
  const newState = Object.assign({}, state, {
    [++ORDER_ID_SEED]: {
      ...order,
    },
  });
  return newState;
};
const deleteOrder = (state, order) => Object.keys(state).reduce((result, key) => {
  if (key !== order.id) {
    result[key] = state[key];
  }
  return result;
});
const orders = (state = {}, action) => {
  switch (action.type) {
    case SO_CREATE_ORDER:
      return createOrder(state);
    case SO_DELETE_ORDER:
      return;
    default:
      return state;
  }
};
