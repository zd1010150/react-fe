import { LOCAL_STORAGE_CART_KEY } from 'config/magento.config';
import { getStoreByKeys } from 'utils/localStorage';
import { ADD_CART_COUNT } from './actionType';

const localCount = getStoreByKeys(LOCAL_STORAGE_CART_KEY);
export const count = (state = localCount !== undefined ? Number(localCount) : 0, action) => {
  switch (action.type) {
    case ADD_CART_COUNT:
      return Number(state) + 1;
    default:
      return state;
  }
};

