import { post } from 'src/store/http/httpAction';
import { SET_LOGISITIC_COST } from './actionType';

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

