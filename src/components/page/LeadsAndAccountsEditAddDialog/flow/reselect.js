import { createSelector } from 'reselect';
import _ from 'lodash';

const getProvinceEditObject = state => state.ui.userEdit.editObject;
const getProvinces = state => state.ui.userEdit.provinces;


export const getCities = createSelector(
  [
    getProvinceEditObject,
    getProvinces,
  ],
  (editObject, provinces) => {
    if (_.isEmpty(provinces)) {
      return [];
    }

    const province = provinces.filter(p => p.id === editObject.province);
    return _.isEmpty(province) ? (provinces[0].cities || []) : province[0].cities;
  },
);
