import { post } from 'store/http/httpAction';
import {
  SET_LOGISITIC_COST,
  SET_NEED_CREATE_INVOICE_BATCH,
  SET_LOGISTITIC_INVOICE_COST,
} from './actionType';

export const setInvoiceCost = cost => ({
  type: SET_LOGISTITIC_INVOICE_COST,
  cost,
});

export const setNeedCreateInvoice = isNeed => ({
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
      dispatch,
    ).then((data) => {
      dispatch(setFreightFee(logisticType, data));
    });
  }
};

export const batchDelete = ids => dispatch => post('/affiliate/delivery-orders/batch-delete', { ids }, dispatch);
