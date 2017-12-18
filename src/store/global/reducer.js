import { combineReducers } from 'redux';
import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO, SET_PAGETITLE, SET_ORDER_USER, SET_GLOBAL_SETTING } from './actionType';

// 页面默认语言为 en，此处只是mock
const language = (state = 'en', action) => {
  let globalLanguage;
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      globalLanguage = action.language;
      break;
    default:
      globalLanguage = state;
      break;
  }
  window.globalLanguage = globalLanguage;
  return globalLanguage;
};
// 权限需要从后端接口获取
const permission = (state = {}, action) => {
  switch (action.type) {
    case SET_PERMISSION:
      return action.permission;
    default:
      return state;
  }
};
// 账户信息
const account = (state = { username: 'DANDAN' }, action) => {
  switch (action.type) {
    case SET_ACCOUNTINFO:
      return action.account;
    default:
      return state;
  }
};
const pageTitle = (state = 'global.pageTitle.leads', action) => {
  switch (action.type) {
    case SET_PAGETITLE:
      return action.pageTitle;
    default:
      return state;
  }
};
const orderUser = (state = null, action) => {
  switch (action.type) {
    case SET_ORDER_USER:
      return action.user;
    default:
      return state;
  }
};
const settings = (state={deliveryOrderStatus:[]}, action) =>{
  switch (action.type) {
    case SET_GLOBAL_SETTING:
      return Object.assign({}, state, action.settings);
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  language,
  permission,
  account,
  pageTitle,
  orderUser,
  settings
});
export default rootReducer;
