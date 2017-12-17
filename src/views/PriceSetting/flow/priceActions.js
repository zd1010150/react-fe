import _ from 'lodash';
import {
  SET_PRICE_TABLE, SET_EDITABLE, CHANGE_CELL, SAVE_ROW, CANCEL_ROW,
  roleGroupIdToKeyMapping, generatePriceTable,
} from './constants';

const pathPriceTable = (priceData) => {
  const categories = generatePriceTable();
  return _.map(categories, (category) => {
    const primateCategory = {};
    _.each(_.filter(priceData, { categoryId: category.id }), (priceItem) => {
      primateCategory[roleGroupIdToKeyMapping[priceItem.groupId]] = priceItem.value;
    });
    return {
      ...category,
      ...primateCategory,
    };
  });
};

export const setPriceData = priceTable => ({
  type: SET_PRICE_TABLE,
  payload: {
    priceTable,
  },
});

export const fetchPriceTable = () => (dispatch) => {
  setTimeout(() => {
    const backData = [{
      groupId: 1, categoryId: 2, value: 5,
    }, {
      groupId: 2, categoryId: 2, value: 8,
    }];
    dispatch(setPriceData(pathPriceTable(backData)));
  }, 0);
};

export const toEdit = categoryId => ({
  type: SET_EDITABLE,
  payload: {
    categoryId,
  },
});

export const changeCell = (value, categoryId, dataIndex) => ({
  type: CHANGE_CELL,
  payload: {
    value,
    categoryId,
    dataIndex,
  },
});

export const saveRow = () => ({
  type: SAVE_ROW,
});

export const cancelRow = () => ({
  type: CANCEL_ROW,
});
