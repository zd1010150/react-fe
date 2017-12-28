import { SET_LOGISITIC_COST } from './actionType';

const getAllCost = orders => orders.reduce((sum, item) => (sum += item.shipping_cost), 0);
const logistic = (state = {}, action) => {
  switch (action.type) {
    case SET_LOGISITIC_COST:
      return Object.assign({}, state, { fee: getAllCost(action.fee), logisticType: action.logisticType });
    default:
      return state;
  }
};
export default logistic;
