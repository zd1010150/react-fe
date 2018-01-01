import { combineReducers } from 'redux';
import { SET_MARKETING_MATERIAL, SET_MM_LANGUAGE, SET_MM_CATEGORY } from './actionType';

const marketingLanguage = (state = '', action) => {
  switch (action.type) {
    case SET_MM_LANGUAGE:
      return action.language;
    default:
      return state;
  }
};
const marketingCategory = (state = '', action) => {
  switch (action.type) {
    case SET_MM_CATEGORY:
      return action.category;
    default:
      return state;
  }
};
const marketingMaterias = (state = [], action) => {
  switch (action.type) {
    case SET_MARKETING_MATERIAL:
      return action.marketingMaterias;
    default:
      return state;
  }
};
export default combineReducers({ marketingMaterias, marketingLanguage, marketingCategory });
