import { combineReducers } from 'redux';
import { SET_LOGISITIC_COST, SET_NEED_CREATE_INVOICE_BATCH, SET_LOGISTITIC_INVOICE_COST } from './actionType';
import { RESET_ORDER } from '../../skeleton/flow/actionType';

const getAllCost = orders => orders.reduce((sum, item) => (sum += Number(item.shipping_cost)), 0);
const getAllWeight = orders => orders.reduce((sum, item) => (sum += Number(item.weight)), 0);
const logistic = (state = {}, action) => {
  let fee;
  switch (action.type) {
    case RESET_ORDER:
      return {};
    case SET_LOGISITIC_COST:
      fee = getAllCost(action.fee);
      return Object.assign({}, state, {
        fee, invoiceFee: fee, logisticType: action.logisticType, weight: getAllWeight(action.fee),
      });
    case SET_LOGISTITIC_INVOICE_COST:
      return Object.assign({}, state, { invoiceFee: action.cost });
    default:
      return state;
  }
};
const needCreateInvoice = (state = true, action) => {
  switch (action.type) {
    case SET_NEED_CREATE_INVOICE_BATCH:
      return action.isNeed;
    default:
      return state;
  }
};
export default combineReducers({
  logistic,
  needCreateInvoice,
});
