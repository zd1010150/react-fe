import { createSelector } from 'reselect';
import _ from 'lodash';

const getInvoicesSelector = invoices => invoices;


export const getReceiver = createSelector(
  [
    getInvoicesSelector,
  ],
  (invoices) => {
    if (_.isEmpty(invoices) || _.isEmpty(invoices[0]) || _.isEmpty(invoices[0].delivery_order)) {
      return {};
    }
    const { receiver } = invoices[0].delivery_order;
    return {
      firstName: receiver.first_name,
      lastName: receiver.last_name,
      street: receiver.street,
      country: receiver.country,
      city: receiver.city,
      state: receiver.state,
      zipCode: receiver.zip_code,
      phone: receiver.phone,
    };
  },
);

