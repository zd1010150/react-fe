import { createSelector } from 'reselect';
import _ from 'lodash';

const getAllFreightsettings = state => state.global.settings.freightSetting;
const getOrderUser = state => state.global.orderUser;


export const getAvailableFreightSettings = createSelector(
  [
    getAllFreightsettings,
    getOrderUser,
  ],
  (allFreightSettings, orderUser) => {
    if (_.isEmpty(allFreightSettings) || _.isEmpty(orderUser && orderUser.country)) {
      return [];
    }
    const { country } = orderUser;
    return allFreightSettings.filter(f => f.allowed_countries.indexOf(country) > -1);
  },
);
