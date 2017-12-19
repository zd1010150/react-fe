import { get } from 'src/store/http/httpAction';
import { SET_TRACK_ORDER_DATA, SET_ID_VIEW } from './actionType';

export const setIdViewData = data => ({
  type: SET_ID_VIEW,
  idViews: data,
});
const setTrackOrderData = trackOrders => ({
  type: SET_TRACK_ORDER_DATA,
  trackOrders,
});
export const setSearchForm = (status, name) => dispatch => get('/affiliate/delivery-ordrs', { status, name }, dispatch).then((data)=>{
  console.log("search form", status, name, data);
  dispatch(setTrackOrderData(data));
});
export const fetchTrackOrders = () => dispatch => get('/affiliate/delivery-orders', {}, dispatch).then((data) => {
  console.log(data);
  dispatch(setTrackOrderData(data));
});

