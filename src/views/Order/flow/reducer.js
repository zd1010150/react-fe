import { combineReducers } from 'redux';
import chooseGoodReducer from '../component/chooseGood/flow/reducers/index';
import splitOrderReducer from '../component/splitOrder/flow/reducers/index';

const Order = combineReducers({
  chooseGood: chooseGoodReducer,
  splitOrder: splitOrderReducer
});
export default Order;
