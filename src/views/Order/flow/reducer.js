import { combineReducers } from 'redux';
import chooseUserReducer from '../component/chooseUser/flow/reducer';
import chooseGoodReducer from '../component/chooseGood/flow/reducers/index';
import splitOrderReducer from '../component/splitOrder/flow/reducers/index';

const Order = combineReducers({
  chooseUser: chooseUserReducer,
  chooseGood: chooseGoodReducer,
  splitOrder: splitOrderReducer,
});
export default Order;
