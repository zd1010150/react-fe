import http from 'utils/http';
import _ from 'lodash';
import {
  HTTP_ACTION_DONE,
  HTTP_ACTION_DOING,
  HTTP_ACTION_ERROR,
} from './constants';

import { addError } from '../error/action';

const dispatch = (request, dispatcher = () => {}) => {
  dispatcher({
    type: HTTP_ACTION_DOING,
    payload: {},
  });
  console.log("url")
 return request.then((data) => {
    console.log('data from server====>', dispatcher);
   dispatcher(addError('test before'));
   debugger;
    if (data.errors || data.status_code || data.message) {
      // let { errors } = data;
      // errors = errors || data.status_code;
      // if (_.isArray(data.errors)) {
      //   Object.keys(errors).forEach((key) => {
      //     const msgs = errors[key];
      //     msgs.forEach((msg) => {
      //       dispatcher({
      //         type: ADD_ERROR,
      //         error: msg,
      //       });
      //     });
      //   });
      // } else {
      console.log('--->error', dispatcher);
      //   dispatcher(addError(data.message));
      // }


      // throw new Error(JSON.stringify(data));

      dispatcher(addError('test error'));
    } else {
      console.log('--->correct', dispatcher);
      dispatcher(addError('test success'));
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
