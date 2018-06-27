import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Logo from '../component/logo';
import Search from '../component/search';
import MiniCart from '../component/miniCart';

import styles from '../HeaderContent.less';

const cx = classNames.bind(styles);

const headerContent = ({ language, count }) => (
  <div className={cx('header-content-wrapper')}>
    <Logo language={language} />
    <div className={cx('right-wrapper')}>
      <MiniCart language={language} count={count} />
      <Search language={language} />
    </div>

  </div>
);

headerContent.propTypes = {
  language: PropTypes.string.isRequired,
};
const mapStateToProps = ({ global, ui }) => ({
  language: global.language,
  count: ui.headerContent.count,
});


const HeaderContent = connect(mapStateToProps)(headerContent);
export default HeaderContent;
