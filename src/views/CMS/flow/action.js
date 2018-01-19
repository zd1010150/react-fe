import { get } from 'store/http/httpAction';
import { SET_CMS_MARKETING_MATERIAL } from './actionType';

const setCMS = (data) => {
  const images = data.images || [];
  const videos = data.video_urls;
  const text = data.description || '';
  return {
    type: SET_CMS_MARKETING_MATERIAL,
    images,
    videos,
    text,
  };
};

const getMaterial = id => dispatch => get(`/affiliate/marketing-materials/${id}`, {}, dispatch).then((data) => {
  if (data && (!data.status_code)) {
    dispatch(setCMS(data.data));
  }
});
export default getMaterial;
