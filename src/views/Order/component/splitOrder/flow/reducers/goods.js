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
} from '../actionType';
import { CREATED, EDITING, SAVED, DELETED } from '../orderStatus';

const mockGoods = [{
  id: '1231',
  name: 'swiss capsulates',
  picture: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
  currentQuantity: 3,
  lastUpdated: '2017-12-13',
  totalValue: 500,
  unitPrice: 20,
  recommendedPrice: 40,
  category: 'vitamins',
}, {
  id: '1232',
  name: '2swiss capsulates',
  picture: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
  currentQuantity: 20,
  lastUpdated: '2017-12-13',
  totalValue: 500,
  unitPrice: 20,
  recommendedPrice: 40,
  category: 'vitamins',
}, {
  id: '1233',
  name: '3swiss capsulates',
  picture: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
  currentQuantity: 20,
  lastUpdated: '2017-12-13',
  totalValue: 500,
  unitPrice: 20,
  recommendedPrice: 40,
  category: 'vitamins',
}, {
  id: '1234',
  name: '4swiss capsulates',
  picture: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
  currentQuantity: 80,
  lastUpdated: '2017-12-13',
  totalValue: 500,
  unitPrice: 20,
  recommendedPrice: 40,
  category: 'vitamins',
}];
const initGoods = goods => goods.map(item => Object.assign({}, item, {
  availableQuantity: item.currentQuantity,
  selectingQuantity: 1,
  key: item.id,
}));

const setSelectingQuantity = (state, operatingGoods, quantity) => {
  if (quantity < 1) return state;
  return state.map((item) => {
    if (item.id === operatingGoods.id) {
      return Object.assign({}, item, { selectingQuantity: quantity });
    }
    return item;
  });
};


const addGoodsToOrder = (state, addedGoods, currentOrder) => {
  if (addedGoods.selectingQuantity < 1 || currentOrder.status !== EDITING) return state;
  return state.map((item) => {
    if (item.id === addedGoods.id) {
      const availableQuantity = item.availableQuantity - item.selectingQuantity;
      const selectingQuantity = availableQuantity > 0 ? 1 : 0;
      return Object.assign({}, item, { availableQuantity, selectingQuantity });
    }
    return item;
  });
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
const updateGoodsQuantityWhenEdtingOrderGoods = (state, updatingGoods, quantity, orders, currentOrder) => state.map((item) => {
  if (item.id === updatingGoods.id) {
    const availableQuantity = item.currentQuantity - quantity - getAllSelectedQuantity(orders, updatingGoods.id, currentOrder);
    const selectingQuantity = availableQuantity > 0 ? 1 : 0;
    return Object.assign({}, item, { availableQuantity, selectingQuantity });
  } return item;
});
const updateGoodsQuantityWhenDeleteGoodsFromOrder = (state, deletedGoods) => state.map((item) => {
  if (item.id === deletedGoods.id) {
    const availableQuantity = item.availableQuantity + deletedGoods.quantity;
    const selectingQuantity = 1;
    return Object.assign({}, item, { availableQuantity, selectingQuantity });
  }
  return item;
});
const updateGoodsQuantityWhenDeleteOrder = (state, order) => {
  const orderGoods = order.goods || [];
  if (orderGoods.length < 1) return state;
  return orderGoods.reduce((innerState, goods) =>
    updateGoodsQuantityWhenDeleteGoodsFromOrder(innerState, goods), state);
};
const goods = (state = initGoods(mockGoods), action) => {
  switch (action.type) {
    case SO_SELECTING_GOODS_QUANTITY:
      return setSelectingQuantity(state, action.goods, action.quantity);
    case SO_ADD_GOODS_TO_ORDER:
      return addGoodsToOrder(state, action.goods, action.currentOrder);
    case SO_DELETE_ORDER_GOODS:
      return updateGoodsQuantityWhenDeleteGoodsFromOrder(state, action.goods);
    case SO_DELETE_ORDER:
      return updateGoodsQuantityWhenDeleteOrder(state, action.order);
    case SO_SET_ORDER_GOODS_QUANTITY:
      return updateGoodsQuantityWhenEdtingOrderGoods(state, action.goods, action.quantity, action.orders, action.currentOrder);
    default:
      return state;
  }
};
export default goods;
