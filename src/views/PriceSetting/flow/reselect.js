import { createSelector } from 'reselect';
import _ from 'lodash';

export const roleGroupsSelector = state => state.global.settings.subGroup || [];
const categoriesSelector = state => state.global.settings.subCategory || [];
const priceDataSelector = state => state.price.displayPriceTable;

const roleGroupIdToKeyMappingSelector = createSelector(
  [roleGroupsSelector],
  roleGroups => roleGroups.reduce((keyMap, item) => ({
    ...keyMap,
    [item.id]: item.name,
  }), {}),
);

const roleValueSelector = createSelector(
  [roleGroupsSelector],
  roleGroups => roleGroups.reduce((keyMap, item) => ({
    ...keyMap,
    [item.name]: 5,
  }), {}),
);

// This one is organized like common Table Datasource, [{}, {}, {}]. It's value is initialized with roleValue.
const originalPriceTableSelector = createSelector(
  [categoriesSelector, roleValueSelector],
  (categories, roleValue) => (
    categories.map(category => ({
      ...roleValue,
      ...category,
    }))
  ),
);

// originalPriceTable = [{}, {}, {}], override the originalPriceTable with priceData.
export const finalPriceTableSelector = createSelector(
  [originalPriceTableSelector, roleGroupIdToKeyMappingSelector, priceDataSelector],
  (originalPriceTable, roleGroupIdToKeyMapping, priceData) => (
    _.map(originalPriceTable, (category) => {
      const primateCategory = {};
      _.each(_.filter(priceData, { categoryId: category.id }), (priceItem) => {
        primateCategory[roleGroupIdToKeyMapping[priceItem.groupId]] = priceItem.value;
      });
      return {
        ...category,
        ...primateCategory,
      };
    })
  ),
);
