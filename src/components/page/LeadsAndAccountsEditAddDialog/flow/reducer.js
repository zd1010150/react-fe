/* eslint-disable no-param-reassign,max-len */
import { combineReducers } from 'redux';
import _ from 'lodash';
import { SET_PROVINCES, SET_EDIT_PROVINCE } from './actionType';

const provinces = (state = [], action) => {
  switch (action.type) {
    case SET_PROVINCES:
      return action.provinces || [];
    default:
      return state;
  }
};
const setEditProvince = (province, provinces) => {
  if (province === null || province === undefined || `${province}`.length < 1 ) {
    if (!_.isEmpty(provinces)) {
      return provinces[0].id;
    }
  }
  if (`${province}`.length > 0) {
    return province;
  }
  return '';
};
const editObject = (state = { province: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SET_EDIT_PROVINCE:
      return Object.assign({}, state, { province: setEditProvince(payload.province, payload.provinces) });
    default:
      return state;
  }
};
export default combineReducers({
  provinces,
  editObject,
});
