import { get, post, put, httpDelete } from 'src/store/http/httpAction';
import { SET_CART_COLLAPSE, SELECTING_GOODS_QUANTITY, ADD_GOODS_TO_CART, DELETE_GOODS_FROM_CART, EDITING_CART_GOODS, SET_GOODS, SET_SEARCH_KEY, SET_PAGENATIONS } from './actionType';

const setSearchKey = (searchKey) => ({
  type: SET_SEARCH_KEY,
  searchKey,
})
const setPaginations = (perPage, currentPage, total) => ({
  type: SET_PAGENATIONS,
  perPage,
  currentPage,
  total,
});
export const setCarCollapse = collapsed => ({
  type: SET_CART_COLLAPSE,
  collapsed,
});
export const setGoods = (goods, cart) => ({
  type: SET_GOODS,
  goods,
  cart,
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
});

const fetchData = (per_page, page, search, dispatch, goods) => get('/affiliate/inventorys', {
  per_page,
  page,
  search,
}, dispatch).then((data) => {
  dispatch(setGoods(data.data, goods));
  const { pagination } = data.meta;
  dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
});


export const queryGoodsByPaging = (perPage = 2, currentPage = 1) => (dispatch, getState) => {
  const search = getState().order.chooseGood.searchKey;
  const goods = getState().order.chooseGood.cart.goods;
  return fetchData(perPage, currentPage, search, dispatch, goods);
};

export const queryBySearchKey = searchKey => (dispatch, getState) => {
  const { goodsTablePagination } = getState().order.chooseGood;
  const { perPage, currentPage } = goodsTablePagination;
  const goods = getState().order.chooseGood.cart.goods;

  dispatch(setSearchKey(searchKey));
  return fetchData(perPage, currentPage, searchKey, dispatch, goods);
};

