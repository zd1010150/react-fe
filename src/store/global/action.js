import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO } from './actionType';

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
