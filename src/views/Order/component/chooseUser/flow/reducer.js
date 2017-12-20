import { SET_USER_TABLE_DATA, SET_SEARCH_AREA_VISIBLE } from './actionType';
import { combineReducers } from 'redux';

const users = (state = [], action) => {
  switch (action.type) {
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
const chooseUser = combineReducers({
  users,
  searchAreaVisible,
});
export default chooseUser;
