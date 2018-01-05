import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import _ from 'lodash';
import { setSearchAreaVisible, searchByKeys } from './flow/action';
import Search from './search';
import SelectedUser from './selectedUser';
import Table from './table';
import { goNextStep } from '../skeleton/flow/action';
import styles from '../../Order.less';

const cx = classNames.bind(styles);
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
      user,
      users,
      setOrderUser,
      searchAreaVisible,
      setSearchAreaVisible,
      searchByKeys,
      hasSeletedUser,
      goNextStep,
      intl,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div className="block">

        <div className={classNames('block-content', cx('tab-block-title'))}>
          {searchAreaVisible ?
            <Search selectedUser={user} searchByKeys={searchByKeys} setSearchAreaVisible={setSearchAreaVisible} /> : ''}
          {searchAreaVisible && users.length > 0 ? <Table users={users} setSeletedUser={setOrderUser} /> : ''}
          {!_.isEmpty(user) ? <SelectedUser
            selectedUser={user}
            setSearchAreaVisible={setSearchAreaVisible}
            searchAreaVisible={searchAreaVisible}
          /> : ''}
        </div>
        <div className="block-footer">
          <Button
            type="primary"
            className={cx('order-step-next-btn')}
            style={{ marginLeft: 8 }}
            disabled={!hasSeletedUser}
            onClick={() => {
              console.log('it is trigger');
              goNextStep('chooseUser');
            }}
          >
            { formatMessage({ id: 'global.ui.button.next' }) } <Icon type="arrow-right" />
          </Button>
        </div>
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
  goNextStep,
};
const ChooseUser = connect(mapStateToProps, mapDispatchToProps)(injectIntl(chooseUser));
export default ChooseUser;

