import { combineReducers } from 'redux';
import skeletonReducer from '../component/skeleton/flow/reducers';
import chooseUserReducer from '../component/chooseUser/flow/reducer';
import chooseGoodReducer from '../component/chooseGood/flow/reducers';
import splitOrderReducer from '../component/splitOrder/flow/reducers/index';

const Order = combineReducers({
  skeleton: skeletonReducer,
  chooseUser: chooseUserReducer,
  chooseGood: chooseGoodReducer,
  splitOrder: splitOrderReducer,
});
export default Order;
