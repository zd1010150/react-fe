import { SET_USER_TABLE_DATA, SET_SEARCH_AREA_VISIBLE } from './actionType';
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
    case RESET_ORDER:
      return false;
    case SET_ORDER_USER:
      return !_.isEmpty(action.user);
    default:
      return state;
  }
}
const chooseUser = combineReducers({
  users,
  searchAreaVisible,
  hasSeletedUser,
});
export default chooseUser;
