import { get } from 'store/http/httpAction';
import _ from 'lodash';
import { SET_USER_TABLE_DATA, SET_SEARCH_AREA_VISIBLE, CHOOSE_USER_SET_PAGENATIONS, CHOOSE_USER_SET_KEYS } from './actionType';

export const setUsersData = users => ({
  type: SET_USER_TABLE_DATA,
  users,
});
const setPaginations = (perPage, currentPage, total) => ({
  type: CHOOSE_USER_SET_PAGENATIONS,
  perPage,
  currentPage,
  total,
});
export const setSearchKey = keys => ({
  type: CHOOSE_USER_SET_KEYS,
  keys,
});

export const setSearchAreaVisible = visible => ({
  type: SET_SEARCH_AREA_VISIBLE,
  visible,
});
export const fetchData = (keys, perPage = 5, currentPage = 1, dispatch) => get('/affiliate/affiliated-clients', {
  search: keys, per_page: perPage, page: currentPage, orderBy: 'last_name', sortedBy: 'desc',
}, dispatch).then((data) => {
  if (data && (!_.isEmpty(data.data)) && (!_.isEmpty(data.meta))) {
    dispatch(setUsersData(data.data));
    const { pagination } = data.meta;
    dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
  }
});
export const queryByPaging = (perPage, currentPage) => (dispatch, getState) => {
  const keys = getState().order.chooseUser.searchKey;
  return fetchData(keys, perPage, currentPage, dispatch);
};

export const searchByKeys = keys => (dispatch, getState) => {
  const { perPage } = getState().order.chooseUser.chooseUserTablePagination;
  dispatch(setSearchKey(keys));
  return fetchData(keys, perPage, 1, dispatch);
};
