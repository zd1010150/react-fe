import { URL_PREFIX } from 'config/app.config';

export const getParentUrl = (url) => {
  if (url && url.length > 0 && url.indexOf('/') > -1) {
    const tempet = url.split('/');
    tempet.splice(tempet.length - 1, 1);
    return tempet.join('/');
  }
  return '';
};
export const getLocationOfAbsoluteUrl = (url) => {
  const { host } = window.location;
  return host + URL_PREFIX + url;
};

