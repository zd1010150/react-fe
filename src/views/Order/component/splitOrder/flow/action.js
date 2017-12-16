import {
  SO_SET_ORDERS_BOARD_COLLAPSE,
  SO_SET_ORDER_COLLAPSE,
  SO_SELECTING_GOODS_QUANTITY,
  SO_ADD_GOODS_TO_ORDER,
  SO_SET_ORDER_STATUS,
  SO_CREATE_ORDER,
  SO_DELETE_ORDER,
  SO_DELETE_ORDER_GOODS,
  SO_SET_ORDER_GOODS_QUANTITY,
} from './actionType';

export const setOrderBoardStatus = collapsed => ({
  type: SO_SET_ORDERS_BOARD_COLLAPSE,
  collapsed,
});
export const setOrderCollapse = (orderId, collapsed) => ({
  type: SO_SET_ORDER_COLLAPSE,
  orderId,
  collapsed,
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
export const setOrderGoodsQuantity = (goods, quantity, currentOrder, orders) => ({
  type: SO_SET_ORDER_GOODS_QUANTITY,
  goods,
  quantity,
  currentOrder,
  orders,
});
