import { SET_CART_COLLAPSE, QUERY_GOODS, SELECTING_GOODS_QUANTITY, ADD_GOODS_TO_CART, DELETE_GOODS_FROM_CART, EDITING_CART_GOODS } from './actionType';

export const setCarCollapse = collapsed => ({
  type: SET_CART_COLLAPSE,
  collapsed,
});
export const queryGoods = searchKey => ({
  type: QUERY_GOODS,
  searchKey,
});
export const selectingGoods = (goods, quantity) => ({
  type: SELECTING_GOODS_QUANTITY,
  goods,
  quantity,
});
export const addGoodsToCart = goods => ({
  type: ADD_GOODS_TO_CART,
  goods,
});

export const deleteGoodsFromCart = goods => ({
  type: DELETE_GOODS_FROM_CART,
  goods,
});

export const editingCartGoods = (goods, quantity) => ({
  type: EDITING_CART_GOODS,
  goods,
  quantity,
})

