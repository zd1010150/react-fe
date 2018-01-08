import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Address, Username } from 'components/ui/index';

const addressView = ({
  intl, firstName, lastName, street, country, city, state, zipCode, phone,
}) => {
  const { formatMessage } = intl;
  return (
    <Card className={classNames('invoice-address', 'invoice-address-card')} title={formatMessage({ id: 'global.properNouns.allReciveAddress' })} bodyStyle={{ padding: '15px' }}>
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
    </Card>
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
};
const AddressView = injectIntl(addressView);
export default AddressView;
