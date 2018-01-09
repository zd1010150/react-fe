import { post } from 'store/http/httpAction';
import { SET_LOGISITIC_COST, SET_NEED_CREATE_INVOICE_BATCH } from './actionType';

export const setNeedCreateInvoice = (isNeed) => ({
  type: SET_NEED_CREATE_INVOICE_BATCH,
  isNeed,
});
export const setFreightFee = (logisticType, fee) => ({
  type: SET_LOGISITIC_COST,
  logisticType,
  fee,
});
export const getTotalLogisticFee = (logisticType, deliveryOrderIds) => (dispatch) => {
  if (deliveryOrderIds && deliveryOrderIds.length > 0) {
    return post(
      '/affiliate/delivery-orders/get-shipping-cost',
      {
        freight_setting_id: logisticType,
        delivery_orders_ids: deliveryOrderIds,
      },
    ).then((data) => {
      dispatch(setFreightFee(logisticType, data));
    });
  }
};

