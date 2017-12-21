import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import _ from 'lodash';
import { setSearchAreaVisible, searchByKeys } from './flow/action';
import Search from './search';
import SelectedUser from './selectedUser';
import Table from './table';
import { setCurrentStep } from '../skeleton/flow/action';

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
      user, users, setOrderUser, searchAreaVisible, setSearchAreaVisible, searchByKeys, hasSeletedUser, setCurrentStep,
    } = this.props;
    return (
      <div>
        <Button style={{ marginLeft: 8 }} disabled={!hasSeletedUser} onClick={() => {
          setCurrentStep(1);
        }}>
          next
        </Button>
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
  hasSeletedUser: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ order }) => ({
  ...order.chooseUser,
});
const mapDispatchToProps = {
  setSearchAreaVisible,
  searchByKeys,
  setCurrentStep,
};
const ChooseUser = connect(mapStateToProps, mapDispatchToProps)(injectIntl(chooseUser));
export default ChooseUser;

