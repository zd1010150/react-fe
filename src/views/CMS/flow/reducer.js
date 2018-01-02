import { combineReducers } from 'redux';

import { SET_CMS_MARKETING_MATERIAL } from './actionType';

const cmsContent = (state = { images: [], video: '', text: '' }, action) => {
  switch (action.type) {
    case SET_CMS_MARKETING_MATERIAL:
      return {
        images: action.images,
        video: action.video,
        text: action.text,
      };
    default:
      return state;
  }
};
export default combineReducers({ cmsContent });
