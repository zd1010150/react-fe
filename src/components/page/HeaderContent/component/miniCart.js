/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';


const languageView = ({ intl, onChange, language }) => {
  const { formatMessage } = intl;
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

// checkout/
languageView.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const Language = injectIntl(languageView);
export default Language;
