import { combineReducers } from 'redux';
import { SET_ID_VIEW, SET_TRACK_ORDER_DATA, SET_TRACK_ORDER_PAGINATION, SET_TRACK_ORDER_SEARCH_KEY, SET_TRACK_ORDER_DETAIL_INFO } from './actionType';

const orders = (state = [], action) => {
  switch (action.type) {
    case SET_TRACK_ORDER_DATA:
      return action.trackOrders;
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
const trackOrderDataTablePagination = (state = { perPage: 10, currentPage: 1, total: 0 }, action) => {
  switch (action.type) {
    case SET_TRACK_ORDER_PAGINATION:
      return {
        perPage: action.perPage,
        currentPage: action.currentPage,
        total: action.total,
      };
    default:
      return state;
  }
};

const searchKey = (state = { status: '', name: '' }, action) => {
  switch (action.type) {
    case SET_TRACK_ORDER_SEARCH_KEY:
      return Object.assign({}, state, {
        status: action.status,
        name: action.name,
      });
    default:
      return state;
  }
};

const trackOrder = (state = {}, action) => {
  switch (action.type) {
    case SET_TRACK_ORDER_DETAIL_INFO:
      return action.trackOrder;
    default:
      return state;
  }
};

export default combineReducers({
  orders,
  trackOrder,
  idViews,
  trackOrderDataTablePagination,
  searchKey,
});
