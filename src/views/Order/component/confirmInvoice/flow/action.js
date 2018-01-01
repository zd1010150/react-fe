
import { post } from 'store/http/httpAction';
import { SET_INVOICE_INFO } from './actionType';

const setInvoiceInfo = invoices => ({
  type: SET_INVOICE_INFO,
  invoices,
});
export const confirmGetInvoice = () => (dispatch, getState) => {
  const state = getState();
  const freight = state.order.chooseLogistic.logisticType;
  const deliveryIds = state.order.skeleton.deliveryOrders;
  return post('/affiliate/invoices/batch-create', { freight_setting_id: freight, delivery_orders_ids: deliveryIds }).then((data) => {
    dispatch(setInvoiceInfo(data));
  });
};

