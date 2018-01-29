import _ from 'lodash';
import { combineReducers } from 'redux';
import { positiveFloat } from 'utils/regex';
import {
  SET_CART_COLLAPSE,
  SET_GOODS,
  SELECTING_GOODS_QUANTITY,
  ADD_GOODS_TO_CART,
  DELETE_GOODS_FROM_CART,
  EDITING_CART_GOODS,
  SET_PAGENATIONS,
  SET_SEARCH_KEY,
  CG_SET_NEXT_BUTTON_DISABLE,
  CG_SET_EDITING_PRICE,
  CG_SET_EDITING_PRICE_STATUS,
} from './actionType';
import { RESET_ORDER } from '../../skeleton/flow/actionType';
import { getUnitPrice } from 'utils/mathUtil';
import { MagentoProductImgPrefix } from 'config/magento.config';

const getSeletedQuantity = (itemId, cart) => {
  const items = cart.filter(item => item.id === itemId);
  return items && items.length > 0 ? items[0].quantity : 0;
};

const mixAvailableQuantity = (state, goods, cart) => {
  if (goods && goods.length < 1) return [];
  const newGoods = goods.map(item => ({
    id: item.product.id,
    name: item.product.name,
    sku: item.product.sku,
    // picture: item.product.image_url,
    picture: `${MagentoProductImgPrefix}${item.product.image_url}`,
    currentQuantity: item.current_quantity,
    category: item.product.magento_category_id,
    lastUpdated: item.product.updated_at,
    totalValue: item.total_value, // mock
    unitPrice: getUnitPrice(item.total_value, item.current_quantity), // mock,理论应该按照总价/数量
    recommendedPrice: item.product.recommended_price,
    availableQuantity: item.current_quantity - getSeletedQuantity(item.product.id, cart),
    selectingQuantity: 1,
    key: item.product.id,
    totalPrice: 0, // 总售价
    price: _.round(item.product.saling_price, 2), // 售价初始值
    totalCost: 0, // 总成本价
    isEditingPrice: false,
    editingPrice: _.round(item.product.saling_price, 2),
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

const editingPriceSatatus = (cart, goodsId, isEditingPrice) => cart.map((item) => {
  if (item.id === goodsId) {
    let newPrice = item.price;
    if (item.isEditingPrice && (!isEditingPrice)) { // 说明是保存
      if (positiveFloat.test(item.editingPrice)) { // 符合规则
        newPrice = item.editingPrice;
      }
    }
    return Object.assign({}, item, { isEditingPrice, price: newPrice, editingPrice: newPrice });
  }
  return item;
});
const setEditingPrice = (cart, goodsId, price) => cart.map((item) => {
  if (item.id === goodsId) {
    if (positiveFloat.test(price) || _.isEmpty(price)) { // 符合规则
      return Object.assign({}, item, { editingPrice: price });
    }
  }
  return item;
});
const getTotalInfo = (cart) => {
  let totalCost = 0;
  let totalPrice = 0;
  let totalDuty = 0;
  let totalItemQuantity = 0;
  let singleTotalPrice = 0;
  let singleTotalCost = 0;
  let singleTotalDuty = 0;
  const newCart = cart.map((item) => {
    totalItemQuantity += item.quantity;
    totalPrice += item.quantity * _.round(item.price, 2);
    totalCost += item.quantity * _.round(item.unitPrice, 2);
    totalDuty += item.quantity * _.round(item.recommendedPrice, 2);
    singleTotalCost = item.quantity * _.round(item.unitPrice, 2);
    singleTotalPrice = item.quantity * _.round(item.price, 2);
    singleTotalDuty = item.quantity * _.round(item.recommendedPrice, 2);
    return Object.assign({}, item, {
      totalPrice: singleTotalPrice,
      totalCost: singleTotalCost,
      totalDuty: singleTotalDuty,
    });
  });
  return {
    goods: newCart,
    totalPrice,
    totalItemQuantity,
    totalCost,
    totalDuty,
  };
};

const cart = (state = {
  goods: [], totalPrice: 0, totalItemQuantity: 0, totalCost: 0, totalDuty: 0,
}, action) => {
  let newGoods;
  switch (action.type) {
    case RESET_ORDER:
      return {
        goods: [], totalPrice: 0, totalItemQuantity: 0, totalCost: 0, totalDuty: 0,
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
    case CG_SET_EDITING_PRICE:
      newGoods = setEditingPrice(state.goods, action.goodsId, action.price);
      break;
    case CG_SET_EDITING_PRICE_STATUS:
      newGoods = editingPriceSatatus(state.goods, action.goodsId, action.isEditing);
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
    case RESET_ORDER:
      return {
        perPage: 2,
        currentPage: 1,
        totalPages: 0,
      };
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
    case RESET_ORDER:
      return '';
    case SET_SEARCH_KEY:
      return action.searchKey;
    default:
      return state;
  }
};
const uiState = (state = { nextBtnDisabled: true }, action) => {
  switch (action.type) {
    case CG_SET_NEXT_BUTTON_DISABLE:
      return Object.assign({}, state, { nextBtnDisabled: action.disabled });
    case ADD_GOODS_TO_CART:
      return Object.assign({}, state, { nextBtnDisabled: false });
    case DELETE_GOODS_FROM_CART:
      return Object.assign({}, state, { nextBtnDisabled: action.cart.length - 1 < 1 });
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
  uiState,
});
export default chooseGood;
