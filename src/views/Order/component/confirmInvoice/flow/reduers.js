import { combineReducers } from 'redux';
import { SET_INVOICE_INFO, SET_MAGENTO_SHIPPING_COST, SET_QUOTE_ID } from './actionType';
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
const magentoShippingCost = (state = 0, action) => {
  switch (action.type) {
    case SET_MAGENTO_SHIPPING_COST:
      return action.amount;
    default:
      return state;
  }
};
const magentoQuoteId = (state = 0, action) => {
  switch (action.type) {
    case SET_QUOTE_ID:
      return action.quoteId;
    default:
      return state;
  }
};
export default combineReducers({ invoices, magentoShippingCost, magentoQuoteId });
