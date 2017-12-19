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
    editObj: {},
    operatorType: operateType.VIEW,
  }
  closeUserDialog() {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: false,
      cantEdit: true,
      editObj: {},
    }));
  }
  handleIDClose() {
    console.log('this is editid the userID is', this, this.state);

    const editID = Object.assign({}, this.state.editID, { visible: false });
    this.setState(Object.assign({}, this.state, { editID }));
  }
  handleIDSave(userId, idFront, idBack) {
    console.log('this is id saveid', userId, idFront, idBack);
    this.handleIDClose();
  }
  closeHistoryOrder() {
    this.setState(Object.assign({}, this.state, {
      historyOrderDialogVisble: false,
    }));
  }
  // table action 操作
  handleEditID(record) {
    const editID = Object.assign({}, this.state.editID, {
      visible: true, userId: record.id, idFront: record.idFront, idBack: record.idBack,
    });
    this.setState(Object.assign({}, this.state, { editID }));
  }
  handleUserDetail(record) {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: true,
      editObj: record,
    }));
  }
  handleeditObj(record) {
    this.setState(Object.assign({}, this.state, {
      userDialogVisible: true,
      editObj: record,
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
            <Icon type="edit" onClick={() => { this.handleeditObj(record); }} />
          </Tooltip>
          <Divider type="vertical" />
          <Button size="small" onClick={() => { this.handleHistoryOrder(record.id); }}>{formatMessage({ id: 'page.Accounts.historyOrder' })}</Button>
          <Divider type="vertical" />
          <Link to={`/clientLists/order?userId=${record.id}`} className="a-btn" onClick={() => { this.props.setOrderUser(record); }}>{formatMessage({ id: 'page.Accounts.order' })}</Link>

        </span>
      ),
    }];
    return (
      <div>
        <Table columns={columns} dataSource={data} />
        <IdDialog {...this.state.editID} onOk={() => { this.handleIDSave(); }} onCancel={() => { this.handleIDClose(); }} />
        <LeadsAndAccountsEditAddDialog  visible={this.state.userDialogVisible} editObj={this.state.editObj}  onClose={() => { this.closeUserDialog(); }} />
        <HistoryOrderDialog visible={this.state.historyOrderDialogVisble} onClose={() => { this.closeHistoryOrder(); }} />
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
