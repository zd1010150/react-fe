import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import classNames from 'classnames/bind';
import { Address, Username, OrderStatus } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import styles from '../TrackOrders.less';

const cx = classNames.bind(styles);
const detailAddressView = ({
  intl, firstName, lastName, phone, street, city, state, country, zipCode, orderNumber, createTime, deliveryTime, status, packageCounts,
}) => (
  <Card className={classNames('invoice-address', 'invoice-address-card')} title="订单信息" bodyStyle={{ padding: '15px' }}>
    <ul className={classNames('invoice-ul', 'order-detail-ul')}>
      <li >
        <div className="trade-info-dt">
          订单编号：
        </div>
        <div className="trade-info-dd">
          {orderNumber}
        </div>
      </li>
      <li >
        <div className="trade-info-dt">
          收货地址:
        </div>
        <div className="trade-info-dd">
          <Username firstName={firstName} lastName={lastName} />,
          { phone },
          <Address street={street} city={city} state={state} country={Number(country)} zipCode={zipCode} />
        </div>
      </li>
      <li >
        <div className="trade-info-dt">
          创建时间：
        </div>
        <div className="trade-info-dd">
          {createTime}
        </div>
      </li>
      <li >
        <div className="trade-info-dt">
          派送时间：
        </div>
        <div className="trade-info-dd">
          {deliveryTime}
        </div>
      </li>
      <li >
        <div className="trade-info-dt">
          订单状态：
        </div>
        <div className="trade-info-dd">
          <OrderStatus status={status} />
        </div>
      </li>
      <li >
        <div className="trade-info-dt">
          包裹数：
        </div>
        <div className="trade-info-dd">
          {packageCounts}
        </div>
      </li>
    </ul>
  </Card>
);
detailAddressView.defaultProps = {
  firstName: '',
  lastName: '',
  street: '',
  country: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  orderNumber: '',
  createTime: '',
  deliveryTime: '',
  status: '',
  packageCounts: 0,
};
detailAddressView.propTypes = {
  intl: intlShape.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  street: PropTypes.string,
  country: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  orderNumber: PropTypes.string,
  createTime: PropTypes.string,
  deliveryTime: PropTypes.string,
  status: PropTypes.string,
  packageCounts: PropTypes.number,
};
const DetailAddressView = injectIntl(detailAddressView);
export default DetailAddressView;
