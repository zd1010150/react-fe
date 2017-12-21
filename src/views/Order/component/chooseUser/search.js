import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Input } from 'antd';

const { Search } = Input;
const searchView = ({
  intl, selectedUser, searchByKeys, setSearchAreaVisible,
}) => {
  const { formatMessage } = intl;
  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={value => searchByKeys(value)}
        enterButton
      />
      { _.isEmpty(selectedUser) ? '' : <Button onClick={() => { setSearchAreaVisible(false); }}>{ formatMessage({ id: 'global.ui.button.cancel' }) }</Button> }
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
