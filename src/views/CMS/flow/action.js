import { get } from 'store/http/httpAction';
import { SET_CMS_MARKETING_MATERIAL, SET_VIDEO_STATUS } from './actionType';

export const toggleVideo = (videoId) => ({
  type: SET_VIDEO_STATUS,
  videoId,
});

const setCMS = (data) => {
  const images = data.images || [];
  const videos = data.videos;
  const text = data.description || '';
  return {
    type: SET_CMS_MARKETING_MATERIAL,
    images,
    videos,
    text,
  };
};

export const getMaterial = id => dispatch => get(`/affiliate/marketing-materials/${id}`, {}, dispatch).then((data) => {
  if (data && (!data.status_code)) {
    dispatch(setCMS(data.data));
  }
});

