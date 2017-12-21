import {  SET_CURRENT_STEP, ADD_STEP } from './actionType';


export const setCurrentStep = step => ({
  type: SET_CURRENT_STEP,
  step,
});
export const addSteps = (index, step) => ({
  type: ADD_STEP,
  index,
  step,
});
