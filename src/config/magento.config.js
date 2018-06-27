/* eslint-disable no-underscore-dangle */
import Cookie from 'js-cookie';
import _ from 'lodash';

const LOCAL_STORAGE_CART_KEY = 'mage-cache-storage.cart.summary_count'; // magento 存储的购物车信息的key
const COOKIE_STORE_VIEW_KEY = 'store_locale';
const MAGENTO_LANGUAGES = {
  zh: 'zh_Hans_CN',
  en: 'en_AU',
};

const MagentoDomain = process.env.__MAGENTO_DOMAIN__;
const MagentoCheckoutUrl = `${MagentoDomain}/checkout/#payment`;
const MagentoProductImgPrefix = `${MagentoDomain}/pub/media/catalog/product`;
const getAbsolutePath = (url, language, params = {}) => {
  let dataStr = ''; // 数据拼接字符串
  Object.keys(params).forEach((key) => {
    dataStr += `${key}=${params[key]}&`;
  });
  let tempet = MagentoDomain + url;
  const lang = language === 'en' ? 'storeview_affiliate_english' : 'storeview_affiliate_chinese';
  if (tempet.indexOf('?') > -1) {
    tempet = `${tempet}&___store=${lang}`;
  } else {
    tempet = `${tempet}?___store=${lang}`;
  }
  return `${tempet}${_.isEmpty(dataStr) ? '' : `&${dataStr}`}`;
};
const MagentoStoreView = Cookie.get(COOKIE_STORE_VIEW_KEY) || '';
const MagentoLanguage = MagentoStoreView.indexOf('en') > -1 ? 'en' : 'zh';
const setMangentoLanguageCookie = (language) => {
  Cookie.remove(COOKIE_STORE_VIEW_KEY);
  Cookie.set(COOKIE_STORE_VIEW_KEY, MAGENTO_LANGUAGES[language], { expires: 0.0416667, path: '/' });
};
const removeMangentoLanguageCookie = () => Cookie.remove(COOKIE_STORE_VIEW_KEY);
export {
  MagentoDomain,
  getAbsolutePath,
  MagentoProductImgPrefix,
  LOCAL_STORAGE_CART_KEY,
  MagentoStoreView,
  MagentoCheckoutUrl,
  MagentoLanguage,
  setMangentoLanguageCookie,
  removeMangentoLanguageCookie,
};
