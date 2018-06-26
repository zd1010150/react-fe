import { get } from 'store/http/httpAction';
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
  dispatch(setInventoryData(data.data || []));
  const { pagination } = data.meta;
  dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
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

