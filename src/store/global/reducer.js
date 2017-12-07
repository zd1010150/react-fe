import { combineReducers } from 'redux';
import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO } from './actionType';

// 页面默认语言为 zh，此处只是mock
const language = (state = 'zh', action) => {
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      return action.language;
    default:
      return state;
  }
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
const rootReducer = combineReducers({
  language,
  permission,
  account,
});
export default rootReducer;
