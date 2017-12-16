import { combineReducers } from 'redux';
import {
  SO_SET_ORDERS_BOARD_COLLAPSE,
  SO_ADD_GOODS_TO_ORDER,
  SO_SET_ORDER_STATUS,
  SO_CREATE_ORDER,
  SO_DELETE_ORDER,
  SO_DELETE_ORDER_GOODS,
  SO_SET_ORDER_GOODS_QUANTITY } from '../actionType';
import { CREATED, EDITING, SAVED, DELETED } from '../orderStatus';
import _ from 'lodash';
let ORDER_SEED = 0;
// 一个新order的初始化值
const order = {
  id: '',
  status: CREATED,
  collapsed: false,
  goods: [],
  error: '',
};
const createOrder = (state) => {
  const newId = ++ORDER_SEED;
  return Object.assign({}, state, {
    [newId]: Object.assign({}, order, { id: newId }),
  });
};
const deleteOrder = (state, order) => {
  const { orders, currentOrder, goodsEnable } = state;
  debugger;
  const newOrders = Object.keys(orders).reduce((result, key) => {
    if (Number(key) !== order.id) {
      result[key] = orders[key];
    }
    return result;
  }, {});
  let newCurrenOrder = Object.assign({}, currentOrder);
  let newGoodsEnable = goodsEnable;
  if (_.isEmpty(newOrders)) {
    newCurrenOrder = { id: 0 , goods: []};
    newGoodsEnable = false;
  }
  return Object.assign({}, state, {
    orders: newOrders,
    currentOrder: newCurrenOrder,
    goodsEnable: newGoodsEnable,
  });
};
const setOrderStatus = (state, order, status) => {
  const { currentOrder, orders, goodsEnable } = state;
  const currentOrderId = currentOrder.id;
  const { goods, id, error } = order;
  const setStatus = (orderStatus, _currentOrder, goodsEnable, error = '') => {
    const newOrders = Object.assign({}, orders, {
      [id]: Object.assign({}, orders[id], { status: orderStatus, error }),
    });
    return Object.assign({}, state, {
      orders: newOrders,
      currentOrder: _currentOrder,
      goodsEnable,
    });
  };
  switch (status) {
    case CREATED:
      if (goods && goods.length < 1) {
        return setStatus(CREATED, currentOrder, false);
      }
    case EDITING:
      if ((order.status === CREATED || order.status === SAVED) && currentOrderId === 0) {
        return setStatus(EDITING, Object.assign({}, orders[id], { status: EDITING }), true);
      } else if ((order.status === CREATED || order.status === SAVED) && currentOrderId !== order.id) {
        return setStatus(order.status, currentOrder, goodsEnable, 'EDIT_BEFORE_SAVEING');
      }
    case SAVED:
      return setStatus(SAVED, { id: 0 }, false);
    case DELETED:
      if (order.status === SAVED || currentOrderId !== order.id) { // 正在编辑的不能删除
        return setStatus(DELETED, currentOrder, goodsEnable);
      } else if (order.status === SAVED || currentOrderId === order.id) { // 删除正在编辑的订单
        return setStatus(DELETED, { id: 0, status: DELETED }, false);
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
  if (quantity < 1 || (currentOrder.id === 0) || currentOrder.status !== EDITING) return state;
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
const getAllSelectedQuantity = (orders, goodsId, currentOrder) => {
  let sum = 0;

  const otherOrdersId = Object.keys(orders).filter(item => Number(item) !== currentOrder.id);
  otherOrdersId.forEach((id) => {
    orders[id].goods.forEach((item) => {
      if (item.id === goodsId) {
        sum += item.quantity;
      }
    });
  });
  return sum;
};
// 点击order的数量加减按钮
const setOrderGoodsQuantity = (state, goods, quantity) => {
  const { currentOrder, orders } = state;
  if (!currentOrder) return state;
  const orderGoods = currentOrder.goods;
  const newOrderGoods = orderGoods.map((item) => {
    if (item.id === goods.id) {
      return Object.assign({}, item, {
        quantity,
        availableQuantity: item.currentQuantity - getAllSelectedQuantity(orders, goods.id, currentOrder),
      });
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
export const orders = (state = { orders: {}, currentOrder: { id: 0 }, goodsEnable: false }, action) => {
  switch (action.type) {
    case SO_CREATE_ORDER:
      return Object.assign({}, state, { orders: createOrder(state.orders) });
    case SO_DELETE_ORDER:
      return deleteOrder(state, action.order);
    case SO_SET_ORDER_STATUS:
      return setOrderStatus(state, action.order, action.status);
    case SO_ADD_GOODS_TO_ORDER:
      return addGoodsToOrder(state, action.goods, action.goods.selectingQuantity);
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
export const ordersBorderCollapse = (state = true, action) => {
  switch (action.type) {
    case SO_SET_ORDERS_BOARD_COLLAPSE:
      return action.collapsed;
    default:
      return state;
  }
};
