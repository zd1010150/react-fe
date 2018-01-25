import {
  SO_SET_ORDER_EXPAND,
  SO_SELECTING_GOODS_QUANTITY,
  SO_ADD_GOODS_TO_ORDER,
  SO_SET_ORDER_STATUS,
  SO_CREATE_ORDER,
  SO_DELETE_ORDER,
  SO_DELETE_ORDER_GOODS,
  SO_SET_ORDER_GOODS_QUANTITY,
  SO_INIT_GOODS,
  SO_RESET_ORDER,
  SO_SET_MAX,
} from './actionType';
export const setMax = max => ({
  type: SO_SET_MAX,
  max,
});
export const initGoods = (goods) => ({
  type: SO_INIT_GOODS,
  goods,
});

export const setOrderExpand = (orderId) => ({
  type: SO_SET_ORDER_EXPAND,
  orderId,
});
export const selectingGoods = (goods, quantity) => ({
  type: SO_SELECTING_GOODS_QUANTITY,
  goods,
  quantity,
});
export const addGoodsToOrder = (goods, currentOrder) => ({
  type: SO_ADD_GOODS_TO_ORDER,
  goods,
  currentOrder,
});
export const setOrderStatus = (order, status, currentOrder) => ({
  type: SO_SET_ORDER_STATUS,
  order,
  status,
  currentOrder,
});
export const createOrder = () => ({
  type: SO_CREATE_ORDER,
});
export const deleteOrder = order => ({
  type: SO_DELETE_ORDER,
  order,
});
export const deleteOrderGoods = goods => ({
  type: SO_DELETE_ORDER_GOODS,
  goods,
});
export const resetOrder = () => ({
  type: SO_RESET_ORDER,
});

export const setOrderGoodsQuantity = (goods, quantity, currentOrder, orders) => ({
  type: SO_SET_ORDER_GOODS_QUANTITY,
  goods,
  quantity,
  currentOrder,
  orders,
});
