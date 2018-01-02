import { get } from 'store/http/httpAction';
import { SET_TRACK_ORDER_DATA, SET_ID_VIEW, SET_TRACK_ORDER_PAGINATION, SET_TRACK_ORDER_SEARCH_KEY } from './actionType';

export const setIdViewData = data => ({
  type: SET_ID_VIEW,
  idViews: data,
});
const setTrackOrderData = trackOrders => ({
  type: SET_TRACK_ORDER_DATA,
  trackOrders,
});
const setPaginations = (perPage, currentPage, total) => ({
  type: SET_TRACK_ORDER_PAGINATION,
  perPage,
  currentPage,
  total,
});
const setSearchKey = (status, name) => ({
  type: SET_TRACK_ORDER_SEARCH_KEY,
  status,
  name,
});

const fetchData = (per_page, page, search, dispatch) => get('/affiliate/delivery-orders', {
  per_page,
  page,
  search,
}, dispatch).then((data) => {
  if (data && data.data && data.meta) {
    dispatch(setTrackOrderData(data.data));
    const { pagination } = data.meta;
    dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
  }
});

export const queryByPaging = (perPage, currentPage) => (dispatch, getState) => {
  const state = getState();
  const search = state.trackOrders.searchKey;
  return fetchData(perPage, currentPage, search, dispatch);
};

export const queryBySearchKey = (status, name) => (dispatch, getState) => {
  const { perPage, currentPage } = getState().trackOrders.trackOrderDataTablePagination;
  dispatch(setSearchKey(status, name));
  return fetchData(perPage, currentPage, { status, name }, dispatch);
};

