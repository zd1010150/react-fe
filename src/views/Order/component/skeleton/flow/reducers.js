import { combineReducers } from 'redux';
import { ADD_SPLIT_ORDER, DELETE_SPLIT_ORDER, SET_DELIVERY_ORDERS, SET_NEXT_STEP, SET_PREVIOUS_STEP, RESET_ORDER } from './actionType';

const deleteSplitOrder = (state) => {
  if (state.steps.indexOf('splitOrder') > -1) {
    let newSteps = state.steps.slice();
    newSteps.splice(state.steps.indexOf('splitOrder'), 1);
    return Object.assign({}, state, { steps: newSteps });
  } return state;
};

const steps = (state = {
  steps: ['chooseUser', 'chooseGoods', 'chooseLogistic', 'confirmOrder'],
  currentStep: 0,
}, action) => {
  let stepIndex;
  switch (action.type) {
    case RESET_ORDER:
      return { steps: ['chooseUser', 'chooseGoods', 'chooseLogistic', 'confirmOrder'], currentStep: 0 };
    case SET_NEXT_STEP:
      stepIndex = state.steps.indexOf(action.step);
      if (stepIndex > -1 && stepIndex + 1 < state.steps.length) {
        return Object.assign({}, state, { currentStep: stepIndex + 1 });
      }
      return state;
    case SET_PREVIOUS_STEP:
      stepIndex = state.steps.indexOf(action.step);
      if (stepIndex > -1 && stepIndex - 1 > -1) {
        return Object.assign({}, state, { currentStep: stepIndex - 1 });
      }
      return state;
    case ADD_SPLIT_ORDER:
      const newSteps = state.steps.slice();
      newSteps.splice(2, 0, 'splitOrder');
      return Object.assign({}, state, { steps: newSteps });
    case DELETE_SPLIT_ORDER:
      return deleteSplitOrder(state);
    default:
      return state;
  }
};
const deliveryOrders = (state = [], action) => {
  switch (action.type) {
    case RESET_ORDER:
      return [];
    case SET_DELIVERY_ORDERS:
      return action.deliveryOrders;
    default:
      return state;
  }
};
const skeleton = combineReducers({
  steps,
  deliveryOrders,
});
export default skeleton;
