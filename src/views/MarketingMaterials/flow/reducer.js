import { combineReducers } from 'redux';
import _ from 'lodash';
import { SET_GLOBAL_SETTING } from 'store/global/actionType';
import { SET_MARKETING_MATERIAL, SET_MM_LANGUAGE, SET_MM_CATEGORY, SET_MM_PAGINATION } from './actionType';


export const paginationPayload = {
  perPage: 5,
  currentPage: 1,
  total: 0,
};
const initPagination = (settings) => {
  const classification = _.isEmpty(settings.classification) ? [] : settings.classification;
  const paginationInitState = [];
  const getPagination = (category) => {
    if (!_.isEmpty(category.sub_classification)) {
      category.sub_classification.forEach(subCategory => getPagination(subCategory));
    }
    paginationInitState.push({
      language: 'zh',
      classificationId: category.id,
      pagination: { ...paginationPayload },
    });
    paginationInitState.push({
      language: 'en',
      classificationId: category.id,
      pagination: { ...paginationPayload },
    });
  };
  classification.forEach(item => getPagination(item));
  return paginationInitState;
};
const setMMPagination = (state, classificationId, language, pagination) => {
  const newState = [...state];
  return newState.map((p) => {
    if ((p.language === language) && (p.classificationId === classificationId)) {
      return Object.assign({}, p, { pagination: { ...pagination } });
    } return p;
  });
};
const marketingLanguage = (state = 'zh', action) => {
  switch (action.type) {
    case SET_MM_LANGUAGE:
      return action.language;
    default:
      return state;
  }
};
const marketingCategory = (state = 0, action) => {
  switch (action.type) {
    case SET_MM_CATEGORY:
      return action.category;
    default:
      return state;
  }
};
const marketingPagination = (state = [], action) => {
  switch (action.type) {
    case SET_GLOBAL_SETTING:
      return initPagination(action.settings);
    case SET_MM_PAGINATION:
      return setMMPagination(state, action.classificationId, action.language, action.pagination);
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
export default combineReducers({
  marketingMaterias, marketingLanguage, marketingCategory, marketingPagination,
});
