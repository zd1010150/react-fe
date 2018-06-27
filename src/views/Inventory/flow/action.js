import { get, post } from 'store/http/httpAction';
import _ from 'lodash';
import { MagentoDomain } from 'config/magento.config';
import { SET_INVENTORY_DATA, SET_INVENTORY_PAGENATIONS, SET_INVENTORY_SEARCH_KEY } from './actionType';

export const setSearchKey = keys => ({
  type: SET_INVENTORY_SEARCH_KEY,
  keys,
});

const setInventoryData = inventories => ({
  type: SET_INVENTORY_DATA,
  inventories,
});

const setPaginations = (perPage, currentPage, total) => ({
  type: SET_INVENTORY_PAGENATIONS,
  perPage,
  currentPage,
  total,
});
const fetchInventory = (perPage = 5, currentPage = 1, search, dispatch) => get('/affiliate/inventorys', { per_page: perPage, page: currentPage, search }, dispatch).then((data) => {
  if (!_.isEmpty(data && data.data)) {
    dispatch(setInventoryData(data.data || []));
    const { pagination } = data.meta;
    dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
  }
});

export const queryByPaging = (perPage, currentPage) => (dispatch, getState) => {
  const state = getState();
  return fetchInventory(perPage, currentPage, state.inventory.searchKeys, dispatch);
};
export const queryBySearchKey = searchKey => (dispatch, getState) => {
  const { perPage } = getState().inventory.inventoryDataTablePagination;
  dispatch(setSearchKey(searchKey));
  return fetchInventory(perPage, 1, searchKey, dispatch);
};
export const buy = (sku, quantity, cb) => dispatch => post('/rest/default/V1/carts/mine', {}, dispatch, MagentoDomain, { 'X-Requested-With': 'XMLHttpRequest' }).then((data) => {
  debugger;
  if (data && `${data.quoteId}`.length > 0) {
    const params = {
      cartItem: {
        sku,
        qty: quantity,
        quote_id: data.quoteId,
      },
    };
    post('rest/default/V1/carts/mine/items', params, dispatch, MagentoDomain, { 'X-Requested-With': 'XMLHttpRequest' }).then((data2) => {
      debugger;
      if (data2 && `${data2.item_id}`.length > 0) {
        if (_.isFunction(cb)) {
          cb(data2.name);
        }
      }
    });
  }
});

