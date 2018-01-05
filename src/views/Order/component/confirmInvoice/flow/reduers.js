import { combineReducers } from 'redux';
import { SET_INVOICE_INFO } from './actionType';
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

export default combineReducers({ invoices });
