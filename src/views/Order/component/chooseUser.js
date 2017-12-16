/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Input, Table } from 'antd';

import { intlShape, injectIntl } from 'react-intl';

const { Search } = Input;

class chooseUser extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      searchAreaVisible: _.isEmpty(user),
      data: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchAreaVisible: _.isEmpty(nextProps.user),
    });
  }
  displaySearch() {
    this.setState({
      searchAreaVisible: true,
      data: [],
    });
  }
  cancelResearch() {
    this.setState({
      searchAreaVisible: false,
    });
  }
  selectUser(record) {
    this.props.setOrderUser(record);
  }
  search() {
    const data = [{
      id: '123',
      key: '123',
      firstName: 'wang',
      lastName: 'wu',
      phone: '23333',
      email: '2222',
      address: '33333',
      city: 'bazhong',
      state: 'sichuang',
      country: 'china',
      zipCode: '123455',
      socialMediaType: 'qq',
      socialMediaNumber: '12333',
      group: 'friend',
      interests: ['mastic'],
      idFront: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      idBack: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
    }, {
      id: '124',
      key: '124',
      firstName: 'li',
      lastName: 'si',
      phone: '233333',
      email: '22223',
      address: '33333',
      city: 'bazhong',
      state: 'sichuang',
      country: 'china',
      zipCode: '123455',
      socialMediaType: 'qq',
      socialMediaNumber: '12333',
      group: 'friend',
      interests: ['mastic'],
      idFront: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
      idBack: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
    }];
    this.setState(Object.assign({}, this.state, { data }));
  }
  render() {
    const { formatMessage } = this.props.intl;
    let selecteUserEl = <span />;
    let searchUserEl = <span />;
    const modifySelectedUserEl = <Button onClick={() => { this.displaySearch(); }}>{ formatMessage({ id: 'page.Order.modifyAddress' }) }</Button>;

    const columns = [{
      title: formatMessage({ id: 'global.form.name' }),
      key: 'name',
      render: (text, record) => <span>{record.firstName} {record.lastName}</span>,
    }, {
      title: formatMessage({ id: 'global.form.phone' }),
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: formatMessage({ id: 'global.form.address' }),
      render: (text, record) => (
        <span>{record.address} {record.city} {record.state} {record.state} {record.country} {record.zipCode}</span>
      ),
      key: 'address',
    }, {
      title: formatMessage({ id: 'global.form.email' }),
      dataIndex: 'email',
      key: 'email',
    }, {
      title: formatMessage({ id: 'global.form.group' }),
      dataIndex: 'group',
      key: 'group',
    }, {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      render: (text, record) => (
        <span>
          <Button size="small" onClick={() => { this.selectUser(record); }}>{formatMessage({ id: 'global.ui.button.select' })}</Button>
        </span>
      ),
    }];
    const selectedUser = this.props.user;
    if (!_.isEmpty(selectedUser)) {
      selecteUserEl = (
        <div className="block">
          <div className="block-title">
            <strong>{ formatMessage({ id: 'page.Order.selecteUser' }) }</strong>
            { this.state.searchAreaVisible ? '' : modifySelectedUserEl }
          </div>
          <div className="block-content">
            <dl>
              <dt>{ formatMessage({ id: 'global.form.name' }) }:</dt>
              <dd>{selectedUser.firstName + selectedUser.lastName}</dd>
              <dt>{ formatMessage({ id: 'global.form.phone' }) }:</dt>
              <dd>{selectedUser.phone}</dd>
              <dt>{ formatMessage({ id: 'global.form.address' }) }:</dt>
              <dd>{`${selectedUser.address}.${selectedUser.city}.${selectedUser.state}.${selectedUser.country}  ${selectedUser.zipCode}`}</dd>
              <dt>{ formatMessage({ id: 'global.form.ID' }) }:</dt>
              <dd>
                <img src={selectedUser.idFront} alt="id front" />
                <img src={selectedUser.idBack} alt="id back" />
              </dd>
            </dl>
          </div>
        </div>
      );
    }
    if (this.state.searchAreaVisible) {
      searchUserEl = (
        <div className="block">
          <div className="block-title">
            <strong>{ formatMessage({ id: 'page.Accounts.historyOrder' }) }</strong>
          </div>
          <div className="block-content">
            <Search
              placeholder="input search text"
              onSearch={value => this.search(value)}
              enterButton
            />
            { _.isEmpty(selectedUser) ? '' : <Button onClick={() => { this.cancelResearch(); }}>{ formatMessage({ id: 'global.ui.button.cancel' }) }</Button> }

            { this.state.data && this.state.data.length > 0 ? <Table columns={columns} dataSource={this.state.data} /> : '' }

          </div>
        </div>

      );
    }

    return (
      <div>
        { searchUserEl }
        { selecteUserEl }

      </div>
    );
  }
}


chooseUser.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object.isRequired,
  setOrderUser: PropTypes.func.isRequired,
};
const ChooseUser = injectIntl(chooseUser);
export default ChooseUser;
