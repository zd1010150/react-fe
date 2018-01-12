/* eslint-disable no-underscore-dangle */

const MagentoDomain = process.env.__MAGENTO_DOMAIN__;
const MagentoProductImgPrefix = `${MagentoDomain}/pub/media/catalog/product`;
const getAbsolutePath = (url, language) => {
  const tempet = MagentoDomain + url;
  const lang = language === 'en' ? 'storeview_affiliate_english' : 'storeview_affiliate_chinese';
  if (tempet.indexOf('?') > -1) { return `${tempet}&___store=${lang}`; }
  return `${tempet}?___store=${lang}`;
};

export { MagentoDomain, getAbsolutePath, MagentoProductImgPrefix };
