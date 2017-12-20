import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import _ from 'lodash';
import { setSearchAreaVisible, searchByKeys } from './flow/action';
import Search from './search';
import SelectedUser from './selectedUser';
import Table from './table';

class chooseUser extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.toggleSearchVisible(user);
  }
  toggleSearchVisible(user) {
    if (!_.isEmpty(user)) {
      this.props.setSearchAreaVisible(false);
    } else {
      this.props.setSearchAreaVisible(true);
    }
  }
  render() {
    const {
      user, users, setOrderUser, searchAreaVisible, setSearchAreaVisible, searchByKeys,
    } = this.props;
    return (
      <div>
        {searchAreaVisible ?
          <Search selectedUser={user} searchByKeys={searchByKeys} setSearchAreaVisible={setSearchAreaVisible} /> : ''}
        {searchAreaVisible && users.length > 0 ? <Table users={users} setSeletedUser={setOrderUser} /> : ''}
        {!_.isEmpty(user) ? <SelectedUser
          selectedUser={user}
          setSearchAreaVisible={setSearchAreaVisible}
          searchAreaVisible={searchAreaVisible}
        /> : ''}
      </div>
    );
  }
}
chooseUser.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object.isRequired,
  setOrderUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  searchAreaVisible: PropTypes.bool.isRequired,
  setSearchAreaVisible: PropTypes.func.isRequired,
  searchByKeys: PropTypes.func.isRequired,
};

const mapStateToProps = ({ order }) => ({
  searchAreaVisible: order.chooseUser.searchAreaVisible,
  users: order.chooseUser.users,
});
const mapDispatchToProps = {
  setSearchAreaVisible,
  searchByKeys,
};
const ChooseUser = connect(mapStateToProps, mapDispatchToProps)(injectIntl(chooseUser));
export default ChooseUser;

