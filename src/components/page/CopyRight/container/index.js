import React from 'react';
import payment from 'assets/images/payment.png';
import classNames from 'classnames/bind';
import styles from '../Copyright.less';


const cx = classNames.bind(styles);
const CopyRight = () => (
  <div className={classNames('row', cx('copyright-container'))}>
    <div className={classNames('col-sm-6', 'text-left', cx('copyright'))}>
      <small>Copyright © 2017 Breakable.</small>
    </div>
    <div className="col-sm-6 text-right">
      <img src={payment} alt="" />
    </div>
  </div>
);

export default CopyRight;
