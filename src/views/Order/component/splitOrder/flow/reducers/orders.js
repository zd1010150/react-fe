import { combineReducers } from 'redux';
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
import { CREATED, EDITING, SAVED, DELETED } from '../orderStatus';


let ORDER_ID_SEED = 0;// order id seed

// 一个新order的初始化值
const order = {
  id: '',
  status: CREATED,
  collapsed: false,
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
  const newId = ++ORDER_ID_SEED;
  const newState = Object.assign({}, state, {
    [newId]: Object.assign({}, order, { id: newId }),
  });
  return newState;
};
const deleteOrder = (state, order) => Object.keys(state).reduce((result, key) => {
  if (key !== order.id) {
    result[key] = state[key];
  }
  return result;
}, {});
const setOrderStatus = (state, order, status) => {
  const { currentOrder, orders } = state;
  const currentOrderId = currentOrder.id;
  const { goods, id } = order.goods;
  const setStatus = (orderStatus, _currentOrder) => {
    const newOrders = Object.assign({}, orders, {
      [id]: Object.assign({}, state[id], { status: orderStatus }),
    });
    return Object.assign({}, state, {
      orders: newOrders,
      currentOrder: _currentOrder,
    });
  };
  switch (status) {
    case CREATED:
      if (goods && goods.length < 1) {
        return setStatus(CREATED, currentOrder);
      }
    case EDITING:
      if ((order.status === CREATED || order.status === SAVED) && currentOrderId === 0) {
        return setStatus(EDITING, orders[id]);
      }
    case SAVED:
      return setStatus(SAVED, { id: 0 });
    case DELETED:
      if (order.status === SAVED || currentOrderId !== order.id) { // 正在编辑的不能删除
        return setStatus(DELETED, currentOrder);
      }
    default:
      return state;
  }
};
const updatOrderGoods = (state, newOrderGoods) => {
  const { currentOrder, orders } = state;
  const currentOrderId = currentOrder.id;
  const newOrders = Object.assign({}, orders, {
    [currentOrderId]: Object.assign(
      {},
      orders[currentOrderId],
      {
        goods: newOrderGoods,
      },
    ),
  });
  const newCurrenOrder = Object.assign({}, newOrders[currentOrderId]);
  return Object.assign({}, state, {
    orders: newOrders,
    currentOrder: newCurrenOrder,
  });
};
// 添加商品到order
const addGoodsToOrder = (state, goods, quantity) => {
  const { currentOrder } = state;
  if (quantity < 1 || (currentOrder.id === 0)) return state;
  const orderGoods = currentOrder.goods;
  let newOrderGoods = orderGoods.slice();
  const existGoods = orderGoods.filter(item => item.id === goods.id);
  if (existGoods.length > 0) {
    newOrderGoods = orderGoods.map((item) => {
      if (item.id === goods.id) {
        return Object.assign({}, item, { quantity: item.quantity + quantity });
      } return item;
    });
  } else {
    newOrderGoods.push(Object.assign({}, goods, { quantity }));
  }
  return updatOrderGoods(state, newOrderGoods);
};
// 点击删除商品
const deleteOrderGoods = (state, goods) => {
  const { currentOrder } = state;
  if (!currentOrder) return state;
  const orderGoods = currentOrder.goods;
  const newOrderGoods = orderGoods.filter(item => item.id !== goods.id);
  return updatOrderGoods(state, newOrderGoods);
};
// 点击order的数量加减按钮
const setOrderGoodsQuantity = (state, goods, quantity) => {
  const { currentOrder } = state;
  if (!currentOrder) return state;
  const orderGoods = currentOrder.goods;
  const newOrderGoods = orderGoods.map((item) => {
    if (item.id === goods.id) {
      return Object.assign({}, item, { quantity });
    } return item;
  });
  return updatOrderGoods(state, newOrderGoods);
};
const setOrderCollapse = (state, orderId, collapsed) => {
  const { orders, currentOrder } = state;
  let newCurrenOrder = Object.assign({}, currentOrder);
  const newOrders = orders.map((item) => {
    if (item.id === orderId) {
      return Object.assign({}, item, { collapsed });
    } return item;
  });
  if (currentOrder.id === orderId) {
    newCurrenOrder = Object.assign({}, currentOrder, { collapsed });
  }
  return Object.assign({}, state, {
    orders: newOrders,
    currentOrder: newCurrenOrder,
  });
};
export const  orders = (state = { orders: [], currentOrder: { id: 0 } }, action) => {
  switch (action.type) {
    case SO_CREATE_ORDER:
      return Object.assign({}, state, { orders: createOrder(state.orders) });
    case SO_DELETE_ORDER:
      return Object.assign({}, state, { orders: deleteOrder(state.orders, action.order) });
    case SO_SET_ORDER_STATUS:
      return setOrderStatus(state, action.order, action.status);
    case SO_ADD_GOODS_TO_ORDER:
      return addGoodsToOrder(state, action.goods, action.quantity);
    case SO_DELETE_ORDER_GOODS:
      return deleteOrderGoods(state, action.goods);
    case SO_SET_ORDER_GOODS_QUANTITY:
      return setOrderGoodsQuantity(state, action.goods, action.quantity);
    case SO_SET_ORDERS_BOARD_COLLAPSE:
      return setOrderCollapse(state, action.orderId, action.collapsed);
    default:
      return state;
  }
};
export const ordersBorderCollapse = (state = true, action) =>{
  switch(action.type){
    case SO_SET_ORDERS_BOARD_COLLAPSE:
      return action.collapsed;
    default:
      retruen state;
  }
}
