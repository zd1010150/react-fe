import { createSelector } from 'reselect';
import _ from 'lodash';

const getTrackOrderSelector = trackOrders => trackOrders.trackOrder;


export const getOrderDetail = createSelector(
  [
    getTrackOrderSelector,
  ],
  (trackOrder) => {
    if (_.isEmpty(trackOrder)) {
      return;
    }
    const { receiver } = trackOrder;
    return {
      firstName: receiver.first_name,
      lastName: receiver.last_name,
      street: receiver.street,
      country: receiver.country,
      city: receiver.city,
      state: receiver.state,
      zipCode: receiver.zip_code,
      phone: receiver.phone,
      orderNumber: trackOrder.order_number,
      createTime: trackOrder.created_at,
      deliveryTime: trackOrder.delivery_time,
      status: trackOrder.status,
      packageCounts: trackOrder.package_counts,
    };
  },
);

export const getpackages = createSelector([
  getTrackOrderSelector,
], (trackOrder) => {
  if (_.isEmpty(trackOrder)) {
    return [];
  }
  const trackingNumbers = trackOrder.tracking_number;
  return trackingNumbers.map((track) => {
    const { items } = track;
    const { totalPrice, totalQuantity } = items.reduce(({ totalPrice, totalQuantity }, item) => ({
      totalPrice: totalPrice += Number(item.amount),
      totalQuantity: totalQuantity += Number(item.quantity),
    }), { totalPrice: 0, totalQuantity: 0 });
    return {
      trackingNumber: track.tracking_number,
      items: track.items,
      detailInfo: track.details_info,
      status: track.status,
      logistic: trackOrder.shipping_type,
      updateTime: track.updated_at,
      totalPrice,
      totalQuantity,
      carrierCode: track.carrier_code,
    };
  });
});

export const getUnpackedOrderTotal = createSelector([
  getTrackOrderSelector,
], (trackOrder) => {
  if (_.isEmpty(trackOrder)) {
    return {};
  }
  const { items } = trackOrder;
  const { totalPrice, totalQuantity } =  items.reduce(({ totalPrice, totalQuantity }, item) => ({
    totalPrice: totalPrice += Number(item.amount),
    totalQuantity: totalQuantity += Number(item.quantity),
  }), { totalPrice: 0, totalQuantity: 0 });
  return {
    totalPrice,
    totalQuantity,
  };
});
