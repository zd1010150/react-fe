
import { SET_INVOICE_INFO } from './actionType';

const invoices = (state = {}, action) => {
  switch (action.type) {
    case SET_INVOICE_INFO:
      return action.invoices;
    default:
      return state;
  }
};
export default invoices;
