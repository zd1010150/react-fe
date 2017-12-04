import { combineReducers } from 'redux';
import { TOGGLE_LANGUAGE, SET_PERMISSION } from './actionType';

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
const rootReducer = combineReducers({
  language,
  permission,
});
export default rootReducer;
