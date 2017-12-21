import http from 'src/utils/http';
import {
  HTTP_ACTION_DONE,
  HTTP_ACTION_DOING,
  HTTP_ACTION_ERROR,
} from './constants.js';
import { addError } from '../global/action';

const dispatch = (request, dispatcher = () => {}) => {
  dispatcher({
    type: HTTP_ACTION_DOING,
    payload: {},
  });
  return request.then((data) => {
    console.log('data from server====>', data);
    if (data.status_code) {
      dispatcher(addError(data.message));
    } else {
      dispatcher({
        type: HTTP_ACTION_DONE,
        payload: {
          data,
        },
      });
      return data;
    }
  }).catch((err) => {
    console.log('err from server=====>', err);

    dispatcher({
      type: HTTP_ACTION_ERROR,
      payload: {
        err,
      },
    });
    return Promise.reject(err);
  });
};

export const post = (url, data = {}, realHeaders = {}, dispatcher) =>
  (dispatch(http('post', url, data, realHeaders), dispatcher));

export const get = (url, data, dispatcher) =>
  (dispatch(http('get', url, data), dispatcher));

export const httpDelete = (url, data, dispatcher) =>
  (dispatch(http('delete', url, data), dispatcher));

export const put = (url, data, dispatcher) =>
  (dispatch(http('put', url, data), dispatcher));
