import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { Address, Username, Logistics } from 'components/ui/index';
import styles from '../../Order.less';
const cx = classNames.bind(styles);

const addressView = ({
  intl, firstName, lastName, street, country, city, state, zipCode, phone, freightSetting,
}) => {
  const { formatMessage } = intl;
  return (
    <div className="section pt-xxlg pl-xxlg pr-xxlg bg-white" style={{paddingBottom: '35px'}}>
      <div className="section-header section-header-md">
        <div className="section-header-left title">
          {formatMessage({ id: 'global.properNouns.allReciveAddress' })}
        </div>
        <div className={classNames('section-header-right', cx('invoice-sub-title'))}>
          { formatMessage({ id: 'global.properNouns.logistics' }) }: <Logistics freight={freightSetting} />
        </div>
      </div>
      <div className="section-content section-content-border pt-xlg pl-xlg pb-xlg pr-xlg">
        <ul className={classNames('invoice-ul', 'invoice-address-ul')}>
          <li >
            <div className="trade-info-dt">
              { formatMessage({ id: 'global.properNouns.reciverName' })}:
            </div>
            <div className="trade-info-dd">
              <Username firstName={firstName} lastName={lastName} />
            </div>
          </li>
          <li >
            <div className="trade-info-dt">
              { formatMessage({ id: 'global.properNouns.phone' })}:
            </div>
            <div className="trade-info-dd">
              { phone }
            </div>
          </li>
          <li>
            <div className="trade-info-dt">
              { formatMessage({ id: 'global.properNouns.allReciveAddress' })}:
            </div>
            <div className="trade-info-dd">
              <Address street={street} country={country} city={city} state={state} zipCode={zipCode} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
addressView.defaultProps = {
  firstName: '',
  lastName: '',
  street: '',
  country: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  freightSetting: '',
};
addressView.propTypes = {
  intl: intlShape.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  street: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  phone: PropTypes.string,
  freightSetting: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
const AddressView = injectIntl(addressView);
export default AddressView;
