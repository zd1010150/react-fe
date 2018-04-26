import { SET_USER_TABLE_DATA, SET_SEARCH_AREA_VISIBLE, CHOOSE_USER_SET_PAGENATIONS, CHOOSE_USER_SET_KEYS } from './actionType';
import { combineReducers } from 'redux';
import _ from 'lodash';
import { SET_ORDER_USER } from 'store/global/actionType';
import { RESET_ORDER } from '../../skeleton/flow/actionType';

const users = (state = [], action) => {
  switch (action.type) {
    case RESET_ORDER:
      return [];
    case SET_USER_TABLE_DATA:
      return action.users;
    default:
      return state;
  }
};

const searchAreaVisible = (state = true, action) => {
  switch (action.type) {
    case SET_SEARCH_AREA_VISIBLE:
      return action.visible;
    default:
      return state;
  }
};
const hasSeletedUser = (state = false, action) => {
  switch (action.type) {
    case SET_ORDER_USER:
      return !_.isEmpty(action.user);
    default:
      return state;
  }
}
const chooseUserTablePagination = (state = { perPage: 5, currentPage: 1, total: 0 }, action) => {
  switch (action.type) {
    case CHOOSE_USER_SET_PAGENATIONS:
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
    case CHOOSE_USER_SET_KEYS:
      return action.keys;
    default:
      return state;
  }
};

const chooseUser = combineReducers({
  users,
  searchAreaVisible,
  hasSeletedUser,
  chooseUserTablePagination,
  searchKey,
});
export default chooseUser;
