

import { post } from 'store/http/httpAction';
import { MagentoDomain } from 'config/magento.config';
import { SET_INVOICE_INFO, SET_MAGENTO_SHIPPING_COST, SET_QUOTE_ID } from './actionType';

export const setMagentoQuoteId = quoteId => ({
  type: SET_QUOTE_ID,
  quoteId,
});
export const setMagentoShippingCost = amount => ({
  type: SET_MAGENTO_SHIPPING_COST,
  amount,
});
export const setInvoiceInfo = invoices => ({
  type: SET_INVOICE_INFO,
  invoices,
});
export const confirmGetInvoice = () => (dispatch, getState) => {
  const state = getState();
  const freight = state.order.chooseLogistic.logistic.logisticType;
  const deliveryIds = state.order.skeleton.deliveryOrders;
  return post('/affiliate/invoices/batch-create', { freight_setting_id: freight, delivery_orders_ids: deliveryIds }, dispatch).then((data) => {
    if (data) {
      dispatch(setInvoiceInfo(data));
    }
  });
};
export const getQuoteId = (amount, callback) => dispatch => post(`/rest/V1/shipping-carts/mine/${amount}`, { }, dispatch, MagentoDomain, { 'X-Requested-With': 'XMLHttpRequest' }).then((data) => {
  if (data) {
    const { quote_id, base_grand_total } = JSON.parse(data);
    dispatch(setMagentoShippingCost(base_grand_total)); // 可能会有问题,react不能及时渲染
    dispatch(setMagentoQuoteId(quote_id));
    callback();
  }
});
