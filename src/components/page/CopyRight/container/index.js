import React from 'react';
import payment from 'assets/images/payment.png';
import classNames from 'classnames/bind';
import styles from '../Copyright.less';


const cx = classNames.bind(styles);
const CopyRight = () => (
  <div className={classNames(cx('copy-wright-wrapper'))} >
    <div className={classNames('row', cx('copyright-container'))}>
      <div className={classNames('col-sm-6', 'text-left', cx('copyright'))}>
        <small>Copyright © 2018 Breakable.</small>
      </div>
      <div className={classNames('col-sm-6', 'text-right', cx('payment-logo'))}>
        <img src={payment} alt="" className={cx('payment-logo-img')} />
      </div>
    </div>
  </div>
);

export default CopyRight;
