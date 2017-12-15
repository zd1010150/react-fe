import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';

const cx = classNames.bind(styles);
const { Search } = Input;

const search = ({ queryGoods, intl }) => {
  const { formatMessage } = intl;
  return (
    <div className="block">
      <div className="block-title">
        <strong>{ formatMessage({ id: 'page.Order.selectGoods' }) }</strong>
      </div>
      <div className="block-content">
        <Search
          placeholder={formatMessage({ id: 'page.Order.searchPlaceholder' })}
          onSearch={value => queryGoods(value)}
          enterButton
        />
      </div>
    </div>);
};


search.propTypes = {
  intl: intlShape.isRequired,
  queryGoods: PropTypes.func.isRequired,
};
const SearchView = injectIntl(search);
export default SearchView;
