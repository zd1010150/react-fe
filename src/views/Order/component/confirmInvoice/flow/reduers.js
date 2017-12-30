import { combineReducers } from 'redux';
import { SET_INVOICE_INFO, SET_INVOICE_ADDRESS } from './actionType';
import { RESET_ORDER } from '../../skeleton/flow/actionType';

const invoices = (state = [], action) => {
  switch (action.type) {
    case RESET_ORDER:
      return [];
    case SET_INVOICE_INFO:
      return action.invoices;
    default:
      return state;
  }
};
const address = (state = { userName: 'zhangsan', phone: '13512345678', address: '44 bridge st,North Ryde' }, action) => {
  switch (action.type) {
    case RESET_ORDER:
      return { userName: 'zhangsan', phone: '13512345678', address: '44 bridge st,North Ryde' };
    case SET_INVOICE_ADDRESS:
      return Object.assign({}, state, {
        userName: action.userName,
        phone: action.phone,
        address: action.address,
      });
    default:
      return state;
  }
};
export default combineReducers({ invoices, address });
