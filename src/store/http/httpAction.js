import http from 'utils/http';
import { UNAUTHENTICATION } from 'config/app.config.js';
import { getAbsolutePath } from 'config/magento.config';
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
  return request.then((data) => {
    if (data.status_code === UNAUTHENTICATION.CODE) { // 如果是401为授权，就跳转到登录界面
      window.location.href = getAbsolutePath(UNAUTHENTICATION.REWRIRE_URL, window.globalLanguage);
    }
    if (data.errors || data.status_code || data.message) {
      let { errors } = data;
      errors = errors || data.status_code;
      if (!_.isEmpty(data.errors)) {
        Object.keys(errors).forEach((key) => {
          const msgs = errors[key];
          msgs.forEach((msg) => {
            dispatcher(addError(msg));
          });
        });
      } else {
        dispatcher(addError(data.message));
      }
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
    dispatcher({
      type: HTTP_ACTION_ERROR,
      payload: {
        err,
      },
    });
    return Promise.reject(err);
  });
};

export const post = (url, data = {}, realHeaders = {}, apiDomain = '', dispatcher) =>
  (dispatch(http('post', url, data, realHeaders, apiDomain), dispatcher));

export const get = (url, data, realHeaders = {}, apiDomain = '', dispatcher) =>
  (dispatch(http('get', url, data, realHeaders, apiDomain), dispatcher));

export const httpDelete = (url, data, realHeaders = {}, apiDomain = '', dispatcher) =>
  (dispatch(http('delete', url, data, realHeaders, apiDomain), dispatcher));

export const put = (url, data, realHeaders = {}, apiDomain = '', dispatcher) =>
  (dispatch(http('put', url, data, realHeaders, apiDomain), dispatcher));
