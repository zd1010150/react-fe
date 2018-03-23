import http from 'utils/http';
import { UNAUTHENTICATION } from 'config/app.config.js';
import { MagentoDomain } from 'config/magento.config';
import { getAbsolutePath } from 'config/magento.config';
import Base64 from 'base-64';
import Cookie from 'js-cookie';
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
    if (data.status_code === UNAUTHENTICATION.CODE) {
      http('get', '/rest/V1/affiliate/logout', {}, { 'X-Requested-With': 'XMLHttpRequest' }, MagentoDomain).then((data) => {
        if (data.success) {
          window.location.href = getAbsolutePath(UNAUTHENTICATION.REWRIRE_URL, window.globalLanguage, { [UNAUTHENTICATION.REDIRECT_KEY]: window.location.href });
        }
      });
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

export const post = (url, data = {}, dispatcher, apiDomain = '', realHeaders = {}) =>
  (dispatch(http('post', url, data, realHeaders, apiDomain), dispatcher));

export const get = (url, data, dispatcher, apiDomain = '', realHeaders = {}) =>
  (dispatch(http('get', url, data, realHeaders, apiDomain), dispatcher));

export const httpDelete = (url, data, dispatcher, apiDomain = '', realHeaders = {}) =>
  (dispatch(http('delete', url, data, realHeaders, apiDomain), dispatcher));

export const put = (url, data, dispatcher, apiDomain = '', realHeaders = {}) =>
  (dispatch(http('put', url, data, realHeaders, apiDomain), dispatcher));
