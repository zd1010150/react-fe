import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import styles from '../../Order.less';

const cx = classNames.bind(styles);
const addressView = ({
  intl, userName, phone, address,
}) => (
  <Card className={classNames('invoice-address', 'invoice-address-card')} title="收件人信息" bodyStyle={{ padding: '15px' }}>
    <ul className={classNames('invoice-ul', 'invoice-address-ul')}>
      <li >
        <div className="trade-info-dt">
          Receiver:
        </div>
        <div className="trade-info-dd">
          { userName }
        </div>
      </li>
      <li >
        <div className="trade-info-dt">
          Phone:
        </div>
        <div className="trade-info-dd">
          { phone }
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          Address:
        </div>
        <div className="trade-info-dd">
          { address }
        </div>
      </li>
    </ul>
  </Card>
);
addressView.defaultProps = {
  userName: '',
  phone: '',
  address: '',
};
addressView.propTypes = {
  intl: intlShape.isRequired,
  userName: PropTypes.string,
  phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  address: PropTypes.string,
};
const AddressView = injectIntl(addressView);
export default AddressView;
