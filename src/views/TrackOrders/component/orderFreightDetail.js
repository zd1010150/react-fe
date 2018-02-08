/* when track order didn't have the package info, but has the freight info ,display the order freight info */
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import {  Logistics } from 'components/ui/index';


const orderFreightDetail = ({ intl, freightSettingId }) => {
  const { formatMessage } = intl;

  return (
    <li>
      <div className="trade-info-dt">
        { formatMessage({ id: 'global.properNouns.logistics' }) } :
      </div>
      <div className="trade-info-dd">
        <Logistics freight={freightSettingId} />
      </div>
    </li>
  );
};
orderFreightDetail.defaultProps = {

  freightSettingId: '',
};
orderFreightDetail.propTypes = {
  intl: intlShape.isRequired,
  freightSettingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
const OrderFreightDetail = injectIntl(orderFreightDetail);
export default OrderFreightDetail;
