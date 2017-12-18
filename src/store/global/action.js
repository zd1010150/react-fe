import { get } from 'src/store/http/httpAction';
import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO, SET_PAGETITLE, SET_ORDER_USER, SET_GLOBAL_SETTING } from './actionType';

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
});

