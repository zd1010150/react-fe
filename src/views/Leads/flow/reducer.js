/* eslint-disable no-param-reassign,max-len */
import { combineReducers } from 'redux';
import { SET_ID_VIEW, SET_LEADS_DATA, SET_PAGENATIONS } from './actionType';

const initData = leadsData => leadsData.map((item) => {
  item.key = item.id;
  return item;
});
const leadsData = (state = [], action) => {
  switch (action.type) {
    case SET_LEADS_DATA:
      return initData(action.leads || []);
    default:
      return state;
  }
};
const leadsDataTablePagination = (state = { perPage: 3, currentPage: 1, total: 0 }, action) => {
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
  leadsData,
  idViews,
  leadsDataTablePagination,
});
