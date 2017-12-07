import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { toggleLanguage } from 'store/global/action';
import Language from '../component/language';
import TopStaticNav from '../component/topStaticNav';
import Operations from '../component/operations';
import Welcome from '../component/welcomeMsg';
import styles from '../TopPanel.less';

const cx = classNames.bind(styles);

const topPanel = ({ language, onChange, account }) => (
  <div className={cx('panel', 'header')}>
    <Language language={language} onChange={onChange} />
    <TopStaticNav />
    <Operations account={account} language={language}/>
    <Welcome account={account} />
  </div>
);

topPanel.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.string).isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
  account: global.account,
});
const mapDispatchToProp = {
  onChange: toggleLanguage,
};

const TopPanel = connect(mapStateToProps, mapDispatchToProp)(topPanel);
export default TopPanel;

