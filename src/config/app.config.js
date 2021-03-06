export const MAX_FETCH_TIMEOUT = 300 * 1000;// 超时时间为30s
export const HTTP_STATUS_CODE = 200;
export const MAX_PAYABLE_PRICE = 300;

export const CHINA_CODE = 'CN';
export const AU_CODE = 'AU';
export const CHINA_RMB_CODE = 'CNY';
export const AUS_DOLLER_CODE = 'AUD';

export const CHINESE_CODE = 'zh';

export const UNAUTHENTICATION = { // Unauthentication rewrite url
  CODE: 401,
  REWRIRE_URL: '/customer/account/login/',
  REDIRECT_KEY: 'success_url',
};

export const UNPAIED_ORDER_STATUS = 0; // 未支付的发货单的状态是0
export const CURRENCY_SYMBOL = {
  [CHINA_RMB_CODE]: '￥',
  [AUS_DOLLER_CODE]: '$',
};

export const URL_PREFIX = '/admin'; // 配置的url前缀，在magento中,本应用的所有的访问路径前缀
export const SOURCE_URL_DOMAIN= 'https://docs.cloudhubpanel.com/breakable/docs/footer-policy'; // 资源服务器的domain
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 上传文件size最大是2M

export const SOCIAL_MEDIA = {
  QQ: 'QQ',
  WECHAT: 'weChat',
};
export const NO_SHIPPING_CODE = 'noShipping';
export const SUCCESS_HTTP_CODE = [200, 201];
export const CARRIERS_CODE = {
  EWE: 'ewe',
  AUPOST: 'aupost',
}
