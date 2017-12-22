
import { combineReducers } from 'redux';
import { SET_CART_COLLAPSE, SET_GOODS, SELECTING_GOODS_QUANTITY, ADD_GOODS_TO_CART, DELETE_GOODS_FROM_CART, EDITING_CART_GOODS, SET_PAGENATIONS, SET_SEARCH_KEY, SET_CART_GOODS_PRICE } from './actionType';
import { RESET_ORDER } from '../../skeleton/flow/actionType';

const getSeletedQuantity = (itemId, cart) => {
  const items = cart.filter(item => item.id === itemId);
  return items && items.length > 0 ? items[0].quantity : 0;
};

const mixAvailableQuantity = (state, goods, cart) => {
  if (goods && goods.length < 1) return [];
  const newGoods = goods.map(item => ({
    id: item.product.id,
    name: item.product.name,
    // picture: item.product.image_url,
    picture: 'http://api.breakabletest.com/storage/ids/VehgtQ1z8wE1hGvr9HvPXSz86hOUmdeaFc6rEuAV.jpeg',
    currentQuantity: item.current_quantity,
    category: item.product.magento_category_id,
    lastUpdated: item.product.updated_at,
    totalValue: 10, // mock
    unitPrice: 10, // mock,理论应该按照总价/数量
    recommendedPrice: item.product.recommended_price,
    availableQuantity: item.current_quantity - getSeletedQuantity(item.product.id, cart),
    selectingQuantity: 1,
    key: item.product.id,
    totalPrice: 0, // 总售价
    price: item.product.recommended_price, // 售价
    totalCost: 0, // 总成本价
  }));
  return newGoods;
};
const addGoodsToCart = (cart, goods, quantity) => {
  if (quantity < 1) return cart;
  let newCart = cart.slice();
  const existGoods = cart.filter(item => item.id === goods.id);
  if (existGoods.length > 0) {
    newCart = newCart.map((item) => {
      if (item.id === goods.id) {
        const newQuantity = item.quantity + quantity;
        return Object.assign({}, item, {
          quantity: newQuantity,
        });
      } return item;
    });
  } else {
    newCart.push(Object.assign({}, goods, { quantity }));
  }
  return newCart;
};
const deleteGoodsFromCart = (cart, goods) => {
  let newCart = cart.slice();
  newCart = newCart.filter(item => item.id !== goods.id);
  return newCart;
};
const editingCartGoods = (cart, goods, quantity) => {
  let newCart = cart.slice();
  newCart = newCart.map((item) => {
    if (item.id === goods.id) {
      return Object.assign({}, item, { quantity });
    }
    return item;
  });
  return newCart;
};
const setAvailableQuantity = (allGoods, goods, isAddToCart) => {
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
      return Object.assign({}, item, {
        selectingQuantity: 0,
        availableQuantity: item.currentQuantity - quantity,
      });
    }
    return item;
  });
  return newAllGoods;
};
const goods = (state = [], action) => {
  switch (action.type) {
    case RESET_ORDER:
      return [];
    case SET_GOODS:
      return mixAvailableQuantity(state, action.goods, action.cart);
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
const editItemPrice = (cart, goodsId, price) => cart.map((item) => {
  if (item.id === goodsId) {
    return Object.assign({}, item, { price });
  }
  return item;
});
const getTotalInfo = (cart) => {
  let totalCost = 0;
  let totalPrice = 0;
  let totalItemQuantity = 0;
  let singleTotalPrice = 0;
  let singleTotalCost = 0;
  const newCart = cart.map((item) => {
    totalItemQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
    totalCost += item.quantity * item.unitPrice;
    singleTotalCost = item.quantity * item.unitPrice;
    singleTotalPrice = item.quantity * item.price;
    return Object.assign({}, item, {
      totalPrice: singleTotalPrice,
      totalCost: singleTotalCost,
    });
  });
  return {
    goods: newCart,
    totalPrice,
    totalItemQuantity,
    totalCost,
  };
};

const cart = (state = {
  goods: [], totalPrice: 0, totalItemQuantity: 0, totalCost: 0,
}, action) => {
  let newGoods;
  switch (action.type) {
    case RESET_ORDER:
      return {
        goods: [], totalPrice: 0, totalItemQuantity: 0, totalCost: 0,
      };
    case ADD_GOODS_TO_CART:
      newGoods = addGoodsToCart(state.goods, action.goods, action.goods.selectingQuantity);
      break;
    case DELETE_GOODS_FROM_CART:
      newGoods = deleteGoodsFromCart(state.goods, action.goods);
      break;
    case EDITING_CART_GOODS:
      newGoods = editingCartGoods(state.goods, action.goods, action.quantity);
      break;
    case SET_CART_GOODS_PRICE:
      newGoods = editItemPrice(state.goods, action.goodsId, action.price);
      break;
    default:
      return state;
  }

  return Object.assign({}, state, { ...getTotalInfo(newGoods) });
};
const cartCollapse = (state = false, action) => {
  switch (action.type) {
    case SET_CART_COLLAPSE:
      return action.collapsed;
    default:
      return state;
  }
};
const goodsTablePagination = (state = { perPage: 2, currentPage: 1, totalPages: 0 }, action) => {
  switch (action.type) {
    case SET_PAGENATIONS:
      return {
        perPage: action.perPage,
        currentPage: action.currentPage,
        total: action.total,
      };
    default:
      return state;
  }
};
const searchKey = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_KEY:
      return action.searchKey;
    default:
      return state;
  }
};
const chooseGood = combineReducers({
  goods,
  cart,
  cartCollapse,
  goodsTablePagination,
  searchKey,
});
export default chooseGood;
