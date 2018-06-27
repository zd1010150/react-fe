import { LOCAL_STORAGE_CART_KEY } from 'config/magento.config';
import { getStoreByKeys } from 'utils/localStorage';
import { ADD_CART_COUNT } from './actionType';

export const count = (state = getStoreByKeys(LOCAL_STORAGE_CART_KEY) || 0, action) => {
  switch (action.type) {
    case ADD_CART_COUNT:
      return state + 1;
    default:
      return state;
  }
};

