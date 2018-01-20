import React from 'react';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Icon } from 'antd';
import styles from '../Notification.less';

const cx = classNames.bind(styles);

const errorPayView = ({ intl }) => {
  const { formatMessage } = intl;
  return (
    <div className={cx('pay-success-wrapper')}>
      <p className={classNames(cx('pay-success-icon'), 'text-danger', 'text-center')}><Icon type="close-circle" /> {formatMessage({ id: 'page.Notification.payError' })} </p>
    </div>
  );
};

errorPayView.defaultProps = {

};
errorPayView.propTypes = {
  intl: intlShape.isRequired,
};

const ErrorPayView = injectIntl(errorPayView);
export default ErrorPayView;
