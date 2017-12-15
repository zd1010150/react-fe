import { combineReducers } from 'redux';
import chooseGoodReducer from '../component/chooseGood/flow/reducers/index';

const Order = combineReducers({
  chooseGood: chooseGoodReducer,
});
export default Order;
