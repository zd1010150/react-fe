import { combineReducers } from 'redux';
import { SET_CART_COLLAPSE, QUERY_GOODS, SELECTING_GOODS_QUANTITY, ADD_GOODS_TO_CART, DELETE_GOODS_FROM_CART, EDITING_CART_GOODS } from '../actionType';

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
  currentQuantity: 20,
  lastUpdated: '2017-12-13',
  totalValue: 500,
  unitPrice: 20,
  recommendedPrice: 40,
  category: 'vitamins',
}];

const mixAvailableQuantity = mockGoods.map(item => Object.assign({}, item, {
  availableQuantity: item.currentQuantity,
  selectingQuantity: 1,
  key: item.id,
}));

const addGoodsToCart = (cart, goods, quantity) => {
  debugger;
  if (quantity < 1) return cart;
  let newCart = cart.slice();
  const existGoods = cart.filter(item => item.id === goods.id);
  if (existGoods.length > 0) {
    newCart = newCart.map((item) => {
      if (item.id === goods.id) {
        return Object.assign({}, item, { quantity: item.quantity + quantity });
      } return item;
    });
  } else {
    newCart.push(Object.assign({}, goods, { quantity, isEditing: false }));
  }
  return newCart;
};
const deleteGoodsFromCart = (cart, goods) => {
  let newCart = cart.slice();
  newCart = newCart.filter(item => item.id !== goods.id);
  return newCart;
};
const editingCartGoods = (cart, goods, quantity) => {
  debugger;
  let newCart = cart.slice();
  newCart = newCart.map((item) => {
    if (item.id === goods.id) {
      return Object.assign({}, item, { quantity, availableQuantity: goods.currentQuantity - quantity });
    }
    return item;
  });
  return newCart;
};
const setAvailableQuantity = (allGoods, goods, isAddToCart) => {
  debugger;
  if (goods.selectingQuantity < 1 && isAddToCart) return allGoods; //  如果小于1 就返回
  let newAllGoods = allGoods.slice();
  newAllGoods = newAllGoods.map((item) => {
    if (item.id === goods.id) {
      const availableQuantity = isAddToCart ? item.availableQuantity - item.selectingQuantity : item.currentQuantity;
      const selectingQuantity = availableQuantity > 0 ? 1 : 0;
      return Object.assign({}, item, { availableQuantity, selectingQuantity });
    }
    return item;
  });
  return newAllGoods;
};
const setSelectingQuantity = (allGoods, goods, quantity) => {
  let newAllGoods = allGoods.slice();
  newAllGoods = newAllGoods.map((item) => {
    if (item.id === goods.id) {
      return Object.assign({}, item, { selectingQuantity: quantity });
    }
    return item;
  });
  return newAllGoods;
};
const updateGoodsWhenEditingCartGoods = (allGoods, goods, quantity) => {
  let newAllGoods = allGoods.slice();
  newAllGoods = newAllGoods.map((item) => {
    if (item.id === goods.id) {
      return Object.assign({}, item, { selectingQuantity: 0, availableQuantity: item.currentQuantity - quantity });
    }
    return item;
  });
  return newAllGoods;
};
const goods = (state = [], action) => {
  switch (action.type) {
    case QUERY_GOODS:
      return mixAvailableQuantity;
    case ADD_GOODS_TO_CART:
      return setAvailableQuantity(state, action.goods, true);
    case DELETE_GOODS_FROM_CART:
      return setAvailableQuantity(state, action.goods, false);
    case SELECTING_GOODS_QUANTITY:
      return setSelectingQuantity(state, action.goods, action.quantity);
    case EDITING_CART_GOODS:
      return updateGoodsWhenEditingCartGoods(state, action.goods, action.quantity);
    default:
      return state;
  }
};
const cart = (state = [], action) => {
  switch (action.type) {
    case ADD_GOODS_TO_CART:
      return addGoodsToCart(state, action.goods, action.goods.selectingQuantity);
    case DELETE_GOODS_FROM_CART:
      return deleteGoodsFromCart(state, action.goods);
    case EDITING_CART_GOODS:
      return editingCartGoods(state, action.goods, action.quantity);
    default:
      return state;
  }
};
const cartCollapse = (state = false, action) => {
  switch (action.type) {
    case SET_CART_COLLAPSE:
      return action.collapsed;
    default:
      return state;
  }
};
const chooseGood = combineReducers({
  goods,
  cart,
  cartCollapse,
});
export default chooseGood;
