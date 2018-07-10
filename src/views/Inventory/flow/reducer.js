/* eslint-disable no-param-reassign,max-len */
import { combineReducers } from 'redux';
import { SET_INVENTORY_DATA, SET_INVENTORY_PAGENATIONS, SET_INVENTORY_SEARCH_KEY } from './actionType';


const searchKeys = (state = '', action) => {
  switch (action.type) {
    case SET_INVENTORY_SEARCH_KEY:
      return searchKeys;
    default:
      return state;
  }
};
const inventoryData = (state = [], action) => {
  switch (action.type) {
    case SET_INVENTORY_DATA:
      return action.inventories;
    default:
      return state;
  }
};
const inventoryDataTablePagination = (state = { perPage: 10, currentPage: 1, total: 0 }, action) => {
  switch (action.type) {
    case SET_INVENTORY_PAGENATIONS:
      return {
        perPage: action.perPage,
        currentPage: action.currentPage,
        total: action.total,
      };
    default:
      return state;
  }
};


export default combineReducers({
  searchKeys,
  inventoryData,
  inventoryDataTablePagination,
});
