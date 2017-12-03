import { TOGGLE_LANGUAGE } from './actionType';
import { combineReducers } from 'redux';

const language = (state = 'zh', action) => {
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      return action.language;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  language,
});
export default rootReducer;
