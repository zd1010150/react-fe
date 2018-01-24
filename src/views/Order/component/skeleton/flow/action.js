import { post } from 'store/http/httpAction';

import { SET_CURRENT_STEP, ADD_SPLIT_ORDER, DELETE_SPLIT_ORDER, SET_DELIVERY_ORDERS, SET_NEXT_STEP, SET_PREVIOUS_STEP, RESET_ORDER } from './actionType';


export const setCurrentStep = stepTitle => ({
  type: SET_CURRENT_STEP,
  stepTitle,
});
export const goNextStep = step => ({
  type: SET_NEXT_STEP,
  step,
});
export const goPreviousStep = step => ({
  type: SET_PREVIOUS_STEP,
  step,
});
export const addSplitOrder = () => ({
  type: ADD_SPLIT_ORDER,
});
export const deleteSplitOrder = () => ({
  type: DELETE_SPLIT_ORDER,
});
export const setDeliveryOrders = deliveryOrders => ({
  type: SET_DELIVERY_ORDERS,
  deliveryOrders,
});
export const resetOrder = () => ({
  type: RESET_ORDER,
});
export const createDeliveryOrder = (orders, currentStep) => (dispatch, getState) => {
  const { orderUser } = getState().global;
  const postData = {
    affiliated_clients_id: orderUser.id,
    orders,
  };
  post('/affiliate/delivery-orders/batch-create', postData, dispatch).then((data) => {
    if (data) {
      dispatch(setDeliveryOrders(data));
      dispatch(goNextStep(currentStep));
    }
  });
};
