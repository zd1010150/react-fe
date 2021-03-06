/* eslint-disable no-param-reassign,max-len */
import { combineReducers } from 'redux';
import { SET_ID_VIEW, SET_ACCOUNT_DATA, SET_PAGENATIONS, SET_HISTORY_ORDER_DETAIL } from './actionType';


const initData = accountsData => accountsData.map((item) => {
  item.key = item.id;
  return item;
});
const accountsData = (state = [], action) => {
  switch (action.type) {
    case SET_ACCOUNT_DATA:
      return initData(action.accounts || []);
    default:
      return state;
  }
};
const accountsDataTablePagination = (state = { perPage: 10, currentPage: 1, total: 0 }, action) => {
  switch (action.type) {
    case SET_PAGENATIONS:
      return {
        perPage: action.perPage,
        currentPage: action.currentPage,
        total: action.total,
      };
    default:
      return state;
  }
};
const idViews = (state = {}, action) => {
  switch (action.type) {
    case SET_ID_VIEW:
      return Object.assign({}, state, action.idViews);
    default:
      return state;
  }
};

export default combineReducers({
  accountsData,
  idViews,
  accountsDataTablePagination,
});
