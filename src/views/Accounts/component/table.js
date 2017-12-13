import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Divider, Icon, Tooltip } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import ID from './ID';
import UserDialog from './userDialog';
import HistoryOrderDialog from './historyOrderDialog';
const mockEditUser = {
  firstName: 'dan',
  lastName: 'zhang',
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
};
const mockId = {
  userId: '23333',
  idFront: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
  idBack: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
  visible: false,
};
class leadsTable extends React.Component {
  state = {
    userDialogVisible: false,
    historyOrderDialogVisble: false,
    cantEdit: true,
    editID: mockId,
    editLead: mockEditUser,
  }
  closeUserDialog() {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: false,
      cantEdit: true,
      editLead: {},
    }));
  }
  handleIDClose() {
    console.log('this is editid the userID is', this, this.state);

    const editID = Object.assign({}, this.state.editID, { visible: false });
    this.setState(Object.assign({}, this.state, { editID }));
  }
  closeHistoryOrder() {
    this.setState(Object.assign({}, this.state, {
      historyOrderDialogVisble: false,
    }));
  }
  // table action 操作
  handleEditID(id) {
    console.log('this is editid the userID is', id);

    const editID = Object.assign({}, this.state.editID, { visible: true });
    this.setState(Object.assign({}, this.state, { editID }));
  }
  handleUserDetail(id) {
    console.log('this is userdetail the userID is', id);
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: true,
      cantEdit: false,
      editLead: mockEditUser,
    }));
  }
  handleEditLead(id) {
    console.log('this is editlead the userID is', id);
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: true,
      cantEdit: true,
      editLead: mockEditUser,
    }));
  }
  handleHistoryOrder(id) {
    this.setState(Object.assign({}, this.state, {
      historyOrderDialogVisble: true,
    }));
  }
  render() {
    const { formatMessage } = this.props.intl;
    const columns = [{
      title: formatMessage({ id: 'global.form.name' }),
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: formatMessage({ id: 'global.form.phone' }),
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: formatMessage({ id: 'global.form.address' }),
      dataIndex: 'address',
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
          <Tooltip title={formatMessage({ id: 'page.Leads.editId' })}>
            <Icon type="picture" onClick={() => { this.handleEditID(record.id); }} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={formatMessage({ id: 'page.Leads.userDetail' })}>
            <Icon type="user" onClick={() => { this.handleUserDetail(record.id); }} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={formatMessage({ id: 'page.Leads.editUser' })}>
            <Icon type="edit" onClick={() => { this.handleEditLead(record.id); }} />
          </Tooltip>
          <Divider type="vertical" />
          <Button size="small" onClick={() => { this.handleHistoryOrder(record.id); }}>{formatMessage({ id: 'page.Accounts.historyOrder' })}</Button>
          <Divider type="vertical" />
          <Link to={`/clientLists/order?userId=${record.id}`} className="a-btn">{formatMessage({ id: 'page.Accounts.order' })}</Link>
        </span>
      ),
    }];

    const data = [{
      id: 122333,
      key: 122333,
      name: 'John Brown',
      phone: '13512345678',
      address: 'New York No. 1 Lake Park',
      email: 'zd10101050@163.com',
      group: 'family',
      interests: ['health', 'mestic', 'dddd'],
    }, {
      id: 122345533,
      key: 122345533,
      name: 'John Brown',
      phone: '13512345678',
      address: 'New York No. 1 Lake Park',
      email: 'zd10101050@163.com',
      group: 'family',
      interests: ['health', 'mestic', 'dddd'],
    }, {
      id: 1224555333333,
      key: 1224555333333,
      name: 'John Brown',
      phone: '13512345678',
      address: 'New York No. 1 Lake Park',
      email: 'zd10101050@163.com',
      group: 'family',
      interests: ['health', 'mestic', 'dddd'],
    }];
    return (
      <div>
        <Table columns={columns} dataSource={data} />
        <ID {...this.state.editID} onClose={() => { this.handleIDClose(); }} />
        <UserDialog cantEdit={this.state.cantEdit} visible={this.state.userDialogVisible} editLead={this.state.editLead} language={this.props.language} onClose={() => { this.closeUserDialog(); }} />
        <HistoryOrderDialog visible={this.state.historyOrderDialogVisble} onClose={() => { this.closeHistoryOrder(); }}/>
      </div>
    );
  }
}

leadsTable.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
};

const LeadsTable = injectIntl(leadsTable);
export default LeadsTable;
