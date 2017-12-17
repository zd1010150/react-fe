import _ from 'lodash';
import {
  SET_PRICE_TABLE, SET_EDITABLE, CHANGE_CELL, SAVE_ROW, CANCEL_ROW,
} from './constants';

const initialState = {
  priceTable: [],
  displayPriceTable: [],
};

const setEditable = (priceTable, categoryId) => {
  const firstIndex = _.findIndex(priceTable, { id: categoryId });
  if (firstIndex >= 0) {
    const record = priceTable[firstIndex];
    const newPriceTable = [...priceTable];
    newPriceTable[firstIndex] = {
      ...record,
      editable: true,
    };
    return newPriceTable;
  }
  return priceTable;
};

const changeCell = (state, payload) => {
  const { displayPriceTable } = state;
  const { value, categoryId, dataIndex } = payload;
  const firstIndex = _.findIndex(displayPriceTable, { id: categoryId });
  if (firstIndex >= 0) {
    const record = displayPriceTable[firstIndex];
    const newPriceTable = [...displayPriceTable];
    newPriceTable[firstIndex] = {
      ...record,
      [dataIndex]: value,
    };
    return {
      ...state,
      displayPriceTable: newPriceTable,
    };
  }
  return state;
};

const saveRow = (state) => {
  const displayPriceTable = _.map(state.displayPriceTable, record => ({
    ...record,
    editable: false,
  }));
  return {
    ...state,
    displayPriceTable,
    priceTable: displayPriceTable,
  };
};

export default function priceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PRICE_TABLE:
      return {
        ...state,
        priceTable: payload.priceTable || [],
        displayPriceTable: payload.priceTable || [],
      };
    case SET_EDITABLE:
      return {
        ...state,
        displayPriceTable: setEditable(state.priceTable, payload.categoryId),
      };
    case CHANGE_CELL:
      return changeCell(state, payload);
    case CANCEL_ROW:
      return {
        ...state,
        displayPriceTable: state.priceTable,
      };
    case SAVE_ROW:
      return saveRow(state);
    default:
      return state;
  }
}
