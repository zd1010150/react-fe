/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Divider, Icon, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import ID from './ID';
import UserDialog from './userDialog';
import DeleteDialog from './deleteDialog';

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
    deleteDialogVisible: false,
    deleteUserId: 233,
    userDialogVisible: false,
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
  closeDeleteDialog() {
    console.log('close delete dialog');
    this.setState(Object.assign({}, this.state, {
      deleteDialogVisible: false,
    }));
  }
  // table action 操作
  handleEditID(record) {
    const editID = Object.assign({}, this.state.editID, {
      visible: true, userId: `${record.id}`, idFront: record.idFront, idBack: record.idBack,
    });
    this.setState(Object.assign({}, this.state, { editID }));
  }
  handleUserDetail(record) {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: true,
      cantEdit: false,
      editLead: record,
    }));
  }
  handleEditLead(record) {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: true,
      cantEdit: true,
      editLead: record,
    }));
  }
  handleDeleteLead(id) {
    console.log('this is delete the userID is', id);
    this.setState(Object.assign({}, this.state, {
      deleteDialogVisible: true,
      deleteUserId: id,
    }));
  }
  render() {
    const { formatMessage } = this.props.intl;
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
          <Tooltip title={formatMessage({ id: 'page.Leads.editId' })}>
            <Icon type="picture" onClick={() => { this.handleEditID(record); }} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={formatMessage({ id: 'page.Leads.userDetail' })}>
            <Icon type="user" onClick={() => { this.handleUserDetail(record); }} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={formatMessage({ id: 'page.Leads.editUser' })}>
            <Icon type="edit" onClick={() => { this.handleEditLead(record); }} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={formatMessage({ id: 'page.Leads.deleteUser' })}>
            <Icon type="user-delete" onClick={() => { this.handleDeleteLead(record.id); }} />
          </Tooltip>
          <Divider type="vertical" />
          <Link to={`/clientLists/order?userId=${record.id}`} className="a-btn" onClick={() => { this.props.setOrderUser(record); }}>{formatMessage({ id: 'page.Leads.order' })}</Link>
        </span>
      ),
    }];

    const data = [{
      id: 122333,
      key: 122333,
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
    }, {
      id: 122345533,
      key: 122345533,
      firstName: 'dan1',
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
    }, {
      id: 1224555333333,
      key: 1224555333333,
      firstName: 'dan2',
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
    }];
    return (
      <div>
        <Table columns={columns} dataSource={data} />
        <ID {...this.state.editID} onClose={() => { this.handleIDClose(); }} />
        <UserDialog cantEdit={this.state.cantEdit} visible={this.state.userDialogVisible} editLead={this.state.editLead} language={this.props.language} onClose={() => { this.closeUserDialog(); }} />
        <DeleteDialog userId={this.state.deleteUserId} visible={this.state.deleteDialogVisible} onClose={() => { this.closeDeleteDialog(); }} />
      </div>
    );
  }
}

leadsTable.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
  setOrderUser: PropTypes.func.isRequired,
};

const LeadsTable = injectIntl(leadsTable);
export default LeadsTable;
