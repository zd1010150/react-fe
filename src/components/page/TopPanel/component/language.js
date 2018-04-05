/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../TopPanel.less';
import { CHINESE_CODE } from 'config/app.config';
import chinese from 'assets/images/chinese.png';
import english from 'assets/images/english.png';

const cx = classNames.bind(styles);

const languageView = ({ intl, onChange, language }) => {
  const { formatMessage } = intl;
  const otherLanguage = language === CHINESE_CODE ? 'en' : 'zh';
  const menu = (
    <Menu>
      <Menu.Item>
        <img src={otherLanguage === CHINESE_CODE ? chinese : english} className={cx('language-flag')} alt="language" />
        <button className={cx('ant-dropdown-link')} onClick={() => onChange(otherLanguage)}>{formatMessage({ id: `global.language.${otherLanguage}` })}</button>
      </Menu.Item>


    </Menu>);
  return (
    <div data-role="language">
      <Dropdown overlay={menu}>
        <button className={cx('ant-dropdown-link')}>
          <img className={cx('language-flag')} src={language === CHINESE_CODE ? chinese : english} alt="language" />
          <Icon type="down" className="ml-sm" />
        </button>
      </Dropdown>
    </div>
  );
};


languageView.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const Language = injectIntl(languageView);
export default Language;
