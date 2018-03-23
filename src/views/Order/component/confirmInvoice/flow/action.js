

import { post } from 'store/http/httpAction';
import { MagentoDomain } from 'config/magento.config';
import { getLocationOfAbsoluteUrl } from 'utils/url';
import { SET_INVOICE_INFO } from './actionType';


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
export const getQuoteId = amount => dispatch => post(`/rest/V1/shipping-carts/mine/${amount}`, { }, dispatch, MagentoDomain, { 'X-Requested-With': 'XMLHttpRequest' }).then((data) => {
  if (data) {
    const { quote_id, base_grand_total } = JSON.parse(data);
    dispatch(setMagentoShippingCost(base_grand_total)); // 可能会有问题,react不能及时渲染
    dispatch(setMagentoQuoteId(quote_id));
  }
});

export const pay = data => dispatch => post('/affiliate/delivery-orders/pay', data, dispatch).then((data) => {
  if (data && data.success) { // 成功
    window.location.href = getLocationOfAbsoluteUrl('/resultNotification?view=successPay');
  } else if (data && (!data.success)) { // 不足就需要生成quoteid
    dispatch(getQuoteId(data.lack_qty));
  }
});
