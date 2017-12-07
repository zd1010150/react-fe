/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';


const languageView = ({ intl, onChange, language }) => {
  const { formatMessage } = intl;
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={() => onChange('zh')}>{formatMessage({ id: 'global.language.zh' })}</a>
      </Menu.Item>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={() => onChange('en')}>{formatMessage({ id: 'global.language.en' })}</a>
      </Menu.Item>

    </Menu>);
  return (
    <div data-role="language">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          {formatMessage({ id: `global.language.${language}` })} <Icon type="down" />
        </a>
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
