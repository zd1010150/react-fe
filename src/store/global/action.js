import { get, post } from 'store/http/httpAction';
import _ from 'lodash';
import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO, SET_PAGETITLE, SET_ORDER_USER, SET_GLOBAL_SETTING, RESET_USER, SET_PROVINCES } from './actionType';
import { setMMCategory } from 'views/MarketingMaterials/flow/action';
import { UNAUTHENTICATION } from 'config/app.config.js';
import { getAbsolutePath, MagentoDomain } from 'config/magento.config';

export const setProvinces = data => ({
  type: SET_PROVINCES,
  provinces: data,
});

export const fetchProvince = () => dispatch => get('/affiliate/provinces', {}, dispatch).then((data) => {
  if (data && (!_.isEmpty(data.data))) {
    dispatch(setProvinces(data.data));
  }
});
export const toggleLanguage = language => ({
  type: TOGGLE_LANGUAGE,
  language,
});
export const setAccountInfo = account => ({
  type: SET_ACCOUNTINFO,
  account,
});
export const setPermission = permission => ({
  type: SET_PERMISSION,
  permission,
});
export const setPageTitle = pageTitle => ({
  type: SET_PAGETITLE,
  pageTitle,
});
export const setOrderUser = user => ({
  type: SET_ORDER_USER,
  user,
});
export const resetUser = () => ({
  type: RESET_USER,
});
export const logout = () => dispatch => post('/affiliate/logout').then((data) => {
  window.location.href = getAbsolutePath(UNAUTHENTICATION.REWRIRE_URL, window.globalLanguage);
  // if (!_.isEmpty(data.user)) {
  //   dispatch(setAccountInfo(data.user));
  // }
});
const setGlobalSetting = settings => ({
  type: SET_GLOBAL_SETTING,
  settings,
});
export const fetchGlobalSetting = () => dispatch => get('/affiliate/global-settings', {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(setGlobalSetting(data));
    if (!_.isEmpty(data.classification)) {
      dispatch(setMMCategory(data.classification[0].id));
    }
  }
});

export const fetchAccountInfo = () => dispatch => post('/affiliate/me').then((data) => {
  if (!_.isEmpty(data) && !_.isEmpty(data.user)) {
    dispatch(setAccountInfo(data.user));
  }
});


