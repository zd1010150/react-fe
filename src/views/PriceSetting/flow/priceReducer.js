import _ from 'lodash';
import {
  SET_PRICE_TABLE, SET_EDITABLE, CHANGE_CELL, CANCEL_ROW,
} from './constants';

const initialState = {
  priceTable: [], // the original data
  displayPriceTable: [], // The copy of priceTable for edit, it is used for display.
  editingRowId: -1, // The rowId which is editing currently
};

const changeCell = (state, payload) => {
  const { value, categoryId, groupId } = payload;
  const displayPriceTable = _.reject(state.displayPriceTable, { categoryId, groupId });
  return {
    ...state,
    displayPriceTable: displayPriceTable.concat({
      categoryId,
      groupId,
      value,
    }),
  };
};

export default function priceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PRICE_TABLE:
      return {
        ...state,
        editingRowId: -1,
        priceTable: payload.priceTable || [],
        displayPriceTable: payload.priceTable || [],
      };
    case SET_EDITABLE:
      return {
        ...state,
        editingRowId: payload.categoryId,
        displayPriceTable: state.priceTable, // Restore current unsave row if it exist
      };
    case CHANGE_CELL:
      return changeCell(state, payload);
    case CANCEL_ROW:
      return {
        ...state,
        editingRowId: -1,
        displayPriceTable: state.priceTable,
      };
    default:
      return state;
  }
}
