
import React from 'react';
import classNames from 'classnames/bind';
import { injectIntl, intlShape } from 'react-intl';
import styles from '../error.less';
import { MagentoDomain } from 'config/magento.config';
import { MagentoStaticLink } from 'components/ui/index';
import ErrorLogo from 'assets/images/404-error-logo.png';

const cx = classNames.bind(styles);
const error404 = ({ intl }) => {
  const { formatMessage } = intl;
  return (

    <div className="section">
      <div className="section-header">
        <img src={ErrorLogo} className={cx('language-flag')} alt="language" />
      </div>
      <div className="section-content">
        <p className={cx("error-tip")}>
          { formatMessage({ id: 'page.Error.error404' }) }
        </p>
        <p>
          <MagentoStaticLink aClass="ant-btn ant-btn-primary" title={formatMessage({ id: 'page.Error.error404Btn' })} href="/" />
        </p>
      </div>
    </div>
  );
};
error404.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(error404);
