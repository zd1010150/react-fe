import _ from 'lodash';
import { get, post } from 'src/store/http/httpAction';
import {
  SET_PRICE_TABLE, SET_EDITABLE, CHANGE_CELL, SAVE_ROW, CANCEL_ROW,
} from './constants';

export const setPriceData = priceTable => ({
  type: SET_PRICE_TABLE,
  payload: {
    priceTable,
  },
});

export const fetchPriceTable = () => (dispatch) => {
  get('/affiliate/sub-category-sub-groups').then((data) => {
    const backData = (data.data || []).map(item => ({
      groupId: item.sub_group_id,
      categoryId: item.sub_category_id,
      value: item.percentage,
    }));
    dispatch(setPriceData(backData));
  });
};

export const toEdit = categoryId => ({
  type: SET_EDITABLE,
  payload: {
    categoryId,
  },
});

export const changeCell = (value, categoryId, groupId) => ({
  type: CHANGE_CELL,
  payload: {
    value,
    categoryId,
    groupId,
  },
});

export const saveRow = () => (dispatch, getState) => {
  const { displayPriceTable, editingRowId } = getState().price;
  const validCells = _.filter(displayPriceTable, ({ value, categoryId }) => (
    categoryId === editingRowId && !!value
  ));
  const formData = validCells.map(item => ({
    sub_group_id: item.groupId,
    sub_category_id: item.categoryId,
    percentage: item.value,
  }));
  post('/affiliate/sub-category-sub-groups/batchSave', { data: formData }).then(() => {
    dispatch(fetchPriceTable());
  });
};

export const cancelRow = () => ({
  type: CANCEL_ROW,
});
