import { TOGGLE_LANGUAGE, SET_PERMISSION } from './actionType';

export const toggleLanguage = language => ({
  type: TOGGLE_LANGUAGE,
  language,
});
export const setPermission = permission => ({
  type: SET_PERMISSION,
  permission,
});
