import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Icon } from 'antd';
import styles from '../Notification.less';

const cx = classNames.bind(styles);

const successPayView = ({ intl, message }) => {
  const { formatMessage } = intl;
  return (
    <div className={cx('pay-success-wrapper')}>
      <p className={classNames(cx('pay-success-icon'), 'text-primary', 'text-center')}><Icon type="check-circle" /> {formatMessage({ id: 'page.Notification.paySuccess' })} </p>

      <p className={classNames(cx('notification-prompt-wrapper'))}>
        <Icon type="info-circle" className={classNames('text-primary', 'pr-lg')} />
        { _.isEmpty(message) ? formatMessage({ id: 'page.Notification.paySuccessPrompt' }) : <span>{message}</span>}
      </p>
    </div>
  );
};

successPayView.defaultProps = {
  message: '',
};
successPayView.propTypes = {
  intl: intlShape.isRequired,
  message: PropTypes.string,
};

const SuccessPayView = injectIntl(successPayView);
export default SuccessPayView;
