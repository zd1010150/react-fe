import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Input, Icon } from 'antd';
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
      <div className={classNames(cx('tab-block-title'), 'block-title')} style={{paddingTop: 0}}>
        <strong>搜索用户</strong>
        <Button icon="close" className={cx('cancel-btn')} disabled={_.isEmpty(selectedUser)} onClick={() => { setSearchAreaVisible(false); }} />
      </div>
      <div className="row">
        <div
          className="col-md-12"
        >
          <Search
            placeholder={formatMessage({ id: 'global.ui.input.searchUser' })}
            onSearch={value => searchByKeys(value)}
            enterButton
            className={cx('search-input')}
          />

        </div>
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
