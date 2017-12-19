/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Divider, Icon, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { IdDialog, LeadsAndAccountsEditAddDialog } from 'src/components/page';
import DeleteDialog from './deleteDialog';
import operateType from 'src/components/page/LeadsAndAccountsEditAddDialog/flow/operateType';

class leadsTable extends React.Component {
  state = {
    deleteDialogVisible: false,
    deleteUserId: 233,
    userDialogVisible: false,
    editID: {},
    editLead: {},
    operatorType: operateType.VIEW,
  }
  closeUserDialog() {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: false,
      editLead: {},
    }));
  }
  handleIDClose() {
    const editID = Object.assign({}, this.state.editID, { visible: false });
    this.setState(Object.assign({}, this.state, { editID }));
  }
  handleIDSave(userId, idFront, idBack) {
    this.handleIDClose();
  }
  closeDeleteDialog() {
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
      editLead: record,
      operatorType: operateType.VIEW,
    }));
  }
  handleEditLead(record) {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: true,
      editLead: record,
      operatorType: operateType.EDIT,
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
      render: (text, record) => <span>{record.first_name} {record.last_name}</span>,
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
    const { leadsDataTablePagination, updateLeads } = this.props;
    const pagination = {
      current: leadsDataTablePagination.currentPage,
      pageSize: leadsDataTablePagination.perPage,
      total: leadsDataTablePagination.totalPages,
    };
    return (
      <div>
        { this.props.leadsData && this.props.leadsData.length > 0 ? <Table columns={columns} dataSource={this.props.leadsData} pagination={pagination} onChange={(page, pageSize) => { this.props.fetchLeads(pageSize, page); }} /> : ''}

        <IdDialog {...this.state.editID} onOk={() => { this.handleIDSave(); }} onCancel={() => { this.handleIDClose(); }} />
        <LeadsAndAccountsEditAddDialog visible={this.state.userDialogVisible} editObject={this.state.editLead} onClose={() => { this.closeUserDialog(); }} userType="Leads" operatorType={this.state.operatorType} update={updateLeads} />
        <DeleteDialog userId={this.state.deleteUserId} visible={this.state.deleteDialogVisible} onClose={() => { this.closeDeleteDialog(); }} />
      </div>
    );
  }
}

leadsTable.propTypes = {
  intl: intlShape.isRequired,
  setOrderUser: PropTypes.func.isRequired,
  leadsData: PropTypes.array.isRequired,
  leadsDataTablePagination: PropTypes.object.isRequired,
  fetchLeads: PropTypes.func.isRequired,
  updateLeads: PropTypes.func.isRequired,
};

const LeadsTable = injectIntl(leadsTable);
export default LeadsTable;
