import { combineReducers } from 'redux';
import goods from './goods';
import { orders, expandOrder } from './orders';

const splitOrder = combineReducers({
  goods,
  orders,
  expandOrder,
});
export default splitOrder;
