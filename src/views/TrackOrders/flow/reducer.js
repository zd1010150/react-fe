import { combineReducers } from 'redux';
import { SET_ID_VIEW, SET_TRACK_ORDER_DATA } from './actionType';

const data = [{
  id: 122333,
  key: 122333,
  firstName: 'dan',
  lastName: 'zhang',
  phone: '23333',
  email: '2222',
  address: '33333',
  city: 'bazhong',
  state: 'sichuang',
  country: 'china',
  zipCode: '123455',
  socialMediaType: 'qq',
  socialMediaNumber: '12333',
  group: 'friend',
  interests: ['mastic'],
  idFront: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
  idBack: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
}, {
  id: 122345533,
  key: 122345533,
  firstName: 'dan1',
  lastName: 'zhang',
  phone: '23333',
  email: '2222',
  address: '33333',
  city: 'bazhong',
  state: 'sichuang',
  country: 'china',
  zipCode: '123455',
  socialMediaType: 'qq',
  socialMediaNumber: '12333',
  group: 'friend',
  interests: ['mastic'],
  idFront: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
  idBack: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
}, {
  id: 1224555333333,
  key: 1224555333333,
  firstName: 'dan2',
  lastName: 'zhang',
  phone: '23333',
  email: '2222',
  address: '33333',
  city: 'bazhong',
  state: 'sichuang',
  country: 'china',
  zipCode: '123455',
  socialMediaType: 'qq',
  socialMediaNumber: '12333',
  group: 'friend',
  interests: ['mastic'],
  idFront: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
  idBack: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
}];

const orders = (state = [], action) => {
  switch (action.type) {
    case SET_TRACK_ORDER_DATA:
      return Object.assign({}, state, action.trackOrders);
    default:
      return state;
  }
};

const idViews = (state = {}, action) => {
  switch (action.type) {
    case SET_ID_VIEW:
      return Object.assign({}, state, action.idViews);
    default:
      return state;
  }
};

export default combineReducers({
  orders,
  idViews,
});
