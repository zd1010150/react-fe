import { get } from 'store/http/httpAction';
import { SET_CMS_MARKETING_MATERIAL } from './actionType';

const setCMS = (data) => {
  const images = data.images || [];
  const video = (data.video_urls && data.video_urls[0]) || '';
  const text = data.description || '';
  return {
    type: SET_CMS_MARKETING_MATERIAL,
    images,
    video,
    text,
  };
};

const getMaterial = id => dispatch => get(`/affiliate/marketing-materials/${id}`, dispatch).then((data) => {
  if (data && (!data.status_code)) {
    dispatch(setCMS(data));
  }
});
export default getMaterial;
