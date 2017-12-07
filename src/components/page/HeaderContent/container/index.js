import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Logo from '../component/logo';
import Search from '../component/search';
import styles from '../HeaderContent.less';

const cx = classNames.bind(styles);

const headerContent = ({ language }) => (
  <div className={cx('header-content-wrapper')}>
    <Logo language={language} />
    <Search language={language} />
  </div>
);

headerContent.propTypes = {
  language: PropTypes.string.isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
  account: global.account,
});


const HeaderContent = connect(mapStateToProps)(headerContent);
export default HeaderContent;
