import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from '../../Order.less';

const cx = classNames.bind(styles);
const { Search } = Input;
const searchView = ({
  intl, selectedUser, searchByKeys, setSearchAreaVisible,
}) => {
  const { formatMessage } = intl;
  return (
    <div className={classNames(cx('choose-user-search'), 'block')}>
      <div className="block-title">
        <strong>Search User </strong>
      </div>
      <div className="row">
        <div
          className={classNames({
            'col-md-12': _.isEmpty(selectedUser),
            'col-md-10': !_.isEmpty(selectedUser),
          })}
        >
          <Search
            placeholder="input search text"
            onSearch={value => searchByKeys(value)}
            enterButton
          />
        </div>
        { _.isEmpty(selectedUser) ? '' : <div className="col-md-2 text-right"><Button onClick={() => { setSearchAreaVisible(false); }}>{ formatMessage({ id: 'global.ui.button.cancel' }) }</Button></div> }
      </div>

    </div>
  );
};
searchView.defaultProps = {
  selectedUser: {},
};
searchView.propTypes = {
  intl: intlShape.isRequired,
  selectedUser: PropTypes.object,
  searchByKeys: PropTypes.func.isRequired,
  setSearchAreaVisible: PropTypes.func.isRequired,
};

const SearchView = injectIntl(searchView);
export default SearchView;
