import { combineReducers } from 'redux';
import { SET_CURRENT_STEP, ADD_STEP } from './actionType';


const currentStep = (state = 0, action) => {
  switch (action.type) {
    case SET_CURRENT_STEP:
      return action.step;
    default:
      return state;
  }
};
const steps = (state = ['chooseUser', 'chooseGoods', 'confirmOrder'], action) => {
  switch (action.type) {
    case ADD_STEP:
      return state.slice.splice(action.index, 0, action.step);
    default:
      return state;
  }
};
const skeleton = combineReducers({
  currentStep,
  steps,
});
export default skeleton;
