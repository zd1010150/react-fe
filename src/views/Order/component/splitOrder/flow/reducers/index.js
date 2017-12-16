import { combineReducers } from 'redux';
import goods from './goods';
import { orders, ordersBorderCollapse } from './orders';

const splitOrder = combineReducers({
  goods,
  orders,
  ordersBorderCollapse,
});
export default splitOrder;
