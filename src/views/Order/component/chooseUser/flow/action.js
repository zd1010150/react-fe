import { get } from 'src/store/http/httpAction';
import { SET_USER_TABLE_DATA, SET_SEARCH_AREA_VISIBLE } from './actionType';

export const setUsersData = users => ({
  type: SET_USER_TABLE_DATA,
  users,
});

export const setSearchAreaVisible = visible => ({
  type: SET_SEARCH_AREA_VISIBLE,
  visible,
});
export const searchByKeys = keys => dispatch => get('/affiliate/affiliated-clients', { search: keys }, dispatch).then((data) => {
  dispatch(setUsersData(data.data));
});
