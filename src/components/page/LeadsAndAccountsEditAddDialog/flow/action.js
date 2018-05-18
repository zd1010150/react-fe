import { get } from 'store/http/httpAction';
import _ from 'lodash';
import { SET_PROVINCES, SET_EDIT_CITY, SET_EDIT_PROVINCE } from './actionType';

export const setEditProvince = (province, provinces) => ({
  type: SET_EDIT_PROVINCE,
  province,
  provinces,
});

export const setProvinces = data => ({
  type: SET_PROVINCES,
  provinces: data,
});

export const fetchProvince = () => dispatch => get('/affiliate/provinces', {}, dispatch).then((data) => {
  if (data && (!_.isEmpty(data.data))) {
    dispatch(setProvinces(data.data));
  }
});

