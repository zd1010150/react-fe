import { combineReducers } from 'redux';
import skeletonReducer from '../component/skeleton/flow/reducers';
import chooseUserReducer from '../component/chooseUser/flow/reducer';
import chooseGoodReducer from '../component/chooseGood/flow/reducers';
import splitOrderReducer from '../component/splitOrder/flow/reducers/index';
import chooseLogisticReducer from '../component/chooseLogistic/flow/reducers';
import confirmInvoiceReducer from '../component/confirmInvoice/flow/reduers';

const Order = combineReducers({
  skeleton: skeletonReducer,
  chooseUser: chooseUserReducer,
  chooseGood: chooseGoodReducer,
  splitOrder: splitOrderReducer,
  chooseLogistic: chooseLogisticReducer,
  confirmInvoice: confirmInvoiceReducer,
});
export default Order;
