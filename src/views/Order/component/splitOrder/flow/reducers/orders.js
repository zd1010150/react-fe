import _ from 'lodash';
import {
  SO_SET_ORDERS_BOARD_COLLAPSE,
  SO_ADD_GOODS_TO_ORDER,
  SO_SET_ORDER_STATUS,
  SO_CREATE_ORDER,
  SO_DELETE_ORDER,
  SO_DELETE_ORDER_GOODS,
  SO_RESET_ORDER,
  SO_SET_ORDER_GOODS_QUANTITY,
  SO_SET_MAX,
} from '../actionType';
import { CREATED, EDITING, SAVED, DELETED } from '../orderStatus';
import { RESET_ORDER } from '../../../skeleton/flow/actionType';

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
  const newOrders = Object.keys(orders).reduce((result, key) => {
    if (Number(key) !== order.id) {
      result[key] = orders[key];
    }
    return result;
  }, {});
  let newCurrenOrder = Object.assign({}, currentOrder);
  let newGoodsEnable = goodsEnable;
  if (_.isEmpty(newOrders)) {
    newCurrenOrder = { id: 0, goods: [] };
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
        return setStatus(order.status, currentOrder, goodsEnable, 'ERROR_EDIT_BEFORE_SAVEING');
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

const getTotal = (state) => {
  const { orders, max } = state;
  const newOrders = Object.assign({}, orders);
  const orderId = Object.keys(orders);
  let orderCost = 0;
  let orderPrice = 0;
  let orderDuty = 0;
  let orderQuantity = 0;
  let singleCost = 0;
  let singlePrice = 0;
  let singleDuty = 0;
  let order = {};
  let validate = true;
  orderId.forEach((id) => {
    orderCost = 0;
    orderPrice = 0;
    orderDuty = 0;
    order = newOrders[id];
    const newGoods = order.goods.map((item) => {
      singlePrice = item.quantity * _.round(item.price, 2);
      singleCost = item.quantity * _.round(item.unitPrice, 2);
      singleDuty = item.quantity * _.round(item.recommendedPrice, 2);
      orderCost += singleCost;
      orderPrice += singlePrice;
      orderDuty += singleDuty;
      orderQuantity += item.quantity;
      return Object.assign({}, item, { totalDuty: singleDuty, totalPrice: singlePrice, totalCost: singleCost });
    });
    if (orderDuty > max) {
      order.error = 'ERROR_MAXIMUM_VALUE';
      validate = false;
    } else {
      order.error = '';
    }
    order.goods = newGoods;
    order.totalPrice = orderPrice;
    order.totalCost = orderCost;
    order.totalQuantity = orderQuantity;
    order.totalDuty = orderDuty;
    newOrders[id] = order;
  });

  return Object.assign({}, state, { orders: newOrders, validate });
};
export const orders = (state = {
  orders: {}, currentOrder: { id: 0 }, goodsEnable: false, validate: false, max: 0,
}, action) => {
  let newState;
  switch (action.type) {
    case RESET_ORDER:
      ORDER_SEED = 0;
      return {
        orders: {},
        currentOrder: { id: 0 },
        goodsEnable: false,
        validate: false,
        max: 0,
      };
    case SO_SET_MAX:
      return Object.assign({}, state, { max: action.max });
    case SO_RESET_ORDER:
      return { orders: {}, currentOrder: { id: 0 }, goodsEnable: false };
    case SO_CREATE_ORDER:
      return Object.assign({}, state, { orders: createOrder(state.orders) });
    case SO_DELETE_ORDER:
      newState = deleteOrder(state, action.order);
      break;
    case SO_SET_ORDER_STATUS:
      return setOrderStatus(state, action.order, action.status);
    case SO_ADD_GOODS_TO_ORDER:
      newState = addGoodsToOrder(state, action.goods, action.goods.selectingQuantity);
      break;
    case SO_DELETE_ORDER_GOODS:
      newState = deleteOrderGoods(state, action.goods);
      break;
    case SO_SET_ORDER_GOODS_QUANTITY:
      newState = setOrderGoodsQuantity(state, action.goods, action.quantity);
      break;
    case SO_SET_ORDERS_BOARD_COLLAPSE:
      return setOrderCollapse(state, action.orderId, action.collapsed);

    default:
      return state;
  }
  return getTotal(newState);
};
export const ordersBorderCollapse = (state = true, action) => {
  switch (action.type) {
    case SO_SET_ORDERS_BOARD_COLLAPSE:
      return action.collapsed;
    default:
      return state;
  }
};
