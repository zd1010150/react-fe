export const MAX_FETCH_TIMEOUT = 300 * 1000;// 超时时间为30s
export const HTTP_STATUS_CODE = 200;
export const MAX_PAYABLE_PRICE = 300;

export const CHINA_CODE = 'CN';

export const CHINA_RMB_CODE = 'CNY';
export const AUS_DOLLER_CODE = 'AUD';

export const CHINESE_CODE = 'zh';

export const UNAUTHENTICATION = { // Unauthentication rewrite url
  CODE: 401,
  REWRIRE_URL: '/customer/account/login/',
};
export const LOCAL_STORAGE_CART_KEY = 'mage-cache-storage.cart.summary_count'; // magento 存储的购物车信息的key

export const UNPAIED_ORDER_STATUS = 1; // 未支付的发货单的状态是1
export const CURRENCY_SYMBOL = {
  [CHINA_RMB_CODE]: '￥',
  [AUS_DOLLER_CODE]: '$',
};
