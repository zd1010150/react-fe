import { SET_MARKETING_MATERIAL } from './actionType';
import { combineReducers } from 'redux';

const marketingMaterias = (state = {}, action) => {
  switch (action.type) {
    case SET_MARKETING_MATERIAL:
      return action.marketingMaterias;
    default:
      return state;
  }
};
export default combineReducers({ marketingMaterias });

