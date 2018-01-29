import { combineReducers } from 'redux';
import _ from 'lodash';
import { SET_CMS_MARKETING_MATERIAL, SET_VIDEO_STATUS } from './actionType';

const initVideos = (videos) => {
  const newVideos = {};
  _.forEach(Object.keys(videos), (id) => {
    newVideos[id] = { ...videos[id], isPlaying: false };
  });
  return newVideos;
};
const playPauseVideo = (state, videoId) => {
  const { videos } = state;
  const newVideos = {};
  _.forEach(Object.keys(videos), (id) => {
    const originStatus = videos[id].isPlaying;
    if (`${videoId}` === `${id}`) { // 如果这个视频是在播放的
      newVideos[id] = { ...videos[id], isPlaying: !originStatus };
    } else {
      newVideos[id] = { ...videos[id], isPlaying: false };
    }
  });
  return Object.assign({}, state, { videos: newVideos });
};
const cmsContent = (state = { images: [], videos: {}, text: '' }, action) => {
  switch (action.type) {
    case SET_CMS_MARKETING_MATERIAL:
      return {
        images: action.images,
        videos: initVideos(action.videos || {}),
        text: action.text,
      };
    case SET_VIDEO_STATUS:
      return playPauseVideo(state, action.videoId);
    default:
      return state;
  }
};
export default combineReducers({ cmsContent });
