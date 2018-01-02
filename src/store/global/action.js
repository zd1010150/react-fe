import { get } from 'store/http/httpAction';
import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO, SET_PAGETITLE, SET_ORDER_USER, SET_GLOBAL_SETTING, ADD_ERROR, MARK_READED_ERROR } from './actionType';
import { setMMCategory } from 'views/MarketingMaterials/flow/action';

export const addError = error => ({
  type: ADD_ERROR,
  error,
});
export const markReadedError = id => ({
  type: MARK_READED_ERROR,
  id,
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

const setGlobalSetting = settings => ({
  type: SET_GLOBAL_SETTING,
  settings,
});
export const fetchGlobalSetting = () => dispatch => get('/affiliate/global-settings', {}, dispatch).then((data) => {
  dispatch(setGlobalSetting(data));
  if (data && data.classification && data.classification.length > 0) {
    dispatch(setMMCategory(data.classification[0].id));
  }
});

