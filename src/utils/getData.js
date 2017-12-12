/* eslint-disable one-var,handle-callback-err */

import fetch from './http';

/**
 * 处理各种服务器返回错误
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */

const handlerFailedResponse = (response) => {
  if (response.status_code === 401) {
    console.log('401 error');
  } else if (response.status_code === 429) {
    console.log('429 error');
  } else if (response.status_code === 404) {
    console.log('404 error');
  } else {
    console.log(response.message);
  }
};
/**
 * 处理http请求错误
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
const filterRejectResponse = (error) => {
  console.log(error, 'network error');
};

const fetchData = async function (type = 'GET', url = '', data = {}) {
  return fetch(type, url, data).then((response) => {
    const success = response.status_code === 200;
    if (!success) {
      handlerFailedResponse(response);
    }
    return {
      data: response.data,
      success,
      message: response.message,
      errors: response.errors,
    };
  }, (error) => {
    filterRejectResponse(error);
  });
};

export default fetchData;
