/* eslint-disable max-len */
import { combineReducers } from 'redux';
import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO, SET_PAGETITLE, SET_ORDER_USER, SET_GLOBAL_SETTING, ADD_ERROR, MARK_READED_ERROR, RESET_ORDER } from './actionType';

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
    case RESET_ORDER:
      return null;
    default:
      return state;
  }
};


// 将后端传回来的数据进行一层map
const mapSettingData = (data) => {
  const newData = Object.assign({}, data);
  return {
    classification: newData.classification,
    department: newData.department,
    paymentGateway: newData.payment_gateway,
    subCategory: newData.sub_category, // pricesetting 的列，add leads 中的interests 的类别
    subGroup: newData.sub_group, // Array(7){id: 1, name: "no_profits", created_at: null, updated_at: null}{id: 2, name: "svip", created_at: null, updated_at: null}{id: 3, name: "vvip", created_at: null, updated_at: null}{id: 4, name: "vip", created_at: null, updated_at: null}{id: 5, name: "normal", created_at: null, updated_at: null}{id: 6, name: "family", created_at: null, updated_at: null}{id: 7, name: "friends", created_at: null, updated_at: null}
    accountStatus: newData.account_status, // {id: 1, name: "正在处理"}{id: 2, name: "已激活"}{id: 3, name: "已拒绝"}
    accountType: newData.account_type, // {id: 1, name: "散客lead"}{id: 2, name: "散客accounts"} {id: 3, name: "代理"}
    affiliatedClientStatus: newData.affiliated_client_status, // {id: 1, name: "正在处理"}{id: 2, name: "已激活"}{id: 3, name: "已拒绝"}
    affiliatedClientType: newData.affiliated_client_type, // {id: 1, name: "affiliated_client.sub-leads"} {id: 2, name: "affiliated_client.sub-accounts"}
    deliveryOrderStatus: newData.delivery_order_status,
    orderStatus: newData.order_status,
    orderType: newData.order_type,
    userStatus: newData.user_status,
    freightSetting: newData.freight_setting,
  };
};
const settings = (state = { }, action) => {
  switch (action.type) {
    case SET_GLOBAL_SETTING:
      return mapSettingData(action.settings);
    default:
      return state;
  }
};
const addError = (state, error) => {
  const id = state.length + 1;
  const newState = state.slice();
  newState.push({
    id,
    msg: error,
    readed: false,
  });
  return newState;
};
const markReadedError = (state, errorId) => state.map((item) => {
  if (item.id === errorId) {
    return Object.assign({}, item, { readed: true });
  }
  return item;
});
const errors = (state = [], action) => {
  switch (action.type) {
    case ADD_ERROR:
      return addError(state, action.error);
    case MARK_READED_ERROR:
      return markReadedError(state, action.id);
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
  settings,
  errors,
});
export default rootReducer;
