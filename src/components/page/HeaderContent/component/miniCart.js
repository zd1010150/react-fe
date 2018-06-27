/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Badge } from 'antd';
import { getAbsolutePath } from 'config/magento.config';

const languageView = ({ language, count }) => {
  return (
    <div data-role="mini-cart">
      <a href={getAbsolutePath('/checkout/cart/', language)} className="head-example" >
        <Badge count={count} offset={[10, 20]}>
          <Icon type="shopping-cart" style={{ fontSize: 20, color: '#757575' }} />
        </Badge>
      </a>
    </div>
  );
};

// checkout/
languageView.propTypes = {
  language: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default languageView;
