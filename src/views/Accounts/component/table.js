/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Table, Divider, Icon, Tooltip, Button } from 'antd';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { IdDialog, LeadsAndAccountsEditAddDialog } from 'src/components/page';
import operateType from 'src/components/page/LeadsAndAccountsEditAddDialog/flow/operateType';
import HistoryOrderDialog from './historyOrderDialog';

class accountsTable extends React.Component {
  state = {
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
    const editID = Object.assign({}, this.state.editID, { visible: false });
    this.setState(Object.assign({}, this.state, { editID }));
  }
  handleIDSave(userId, idFront, idBack) {
    const file = {
      file: {
        front_id_doc: idFront,
        back_id_doc: idBack,
      },
    };
    const postData = Object.assign({}, this.state.editObj, { file });
    this.props.updateAccounts(postData);
    this.handleIDClose();
  }
  closeHistoryOrder() {
    this.setState(Object.assign({}, this.state, {
      historyOrderDialogVisble: false,
    }));
  }
  // table action 操作
  handleEditID(record) {
    let idFront = '';
    let idBack = '';
    const rejectReseason = 0;

    if (record.document && record.document.length > 0) {
      const { name, path } = record.document[0];
      if (name === 'front_id_doc') {
        idFront = path || '';
      } else {
        idBack = path || '';
      }
      if (record.document && record.document.length > 1) {
        const { name, path } = record.document[0];
        if (name === 'front_id_doc') {
          idFront = path || '';
        } else {
          idBack = path || '';
        }
      }
    }
    const editID = Object.assign({}, this.state.editID, {
      visible: true, userId: `${record.id}`, idFront, idBack, rejectReseason,
    });
    this.setState(Object.assign({}, this.state, { editID, editObj: record }));
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
    const {
      accountsData, accountsDataTablePagination, fetchAccounts, updateAccounts,
    } = this.props;
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
      render: (text, record) => {
        console.log('record:', record.status);
        const idBtnClasses = classNames({
          btn: true,
          'btn-danger': Number(record.status) === 3,
          'btn-success': Number(record.status) === 2,
        });

        const sendGoodsBtn = () => {
          if (record.document && record.document.length > 1) {
            return (
              <span>
                <Divider type="vertical" />
                <Link to={`/clientLists/order?userId=${record.id}`} className="a-btn" onClick={() => { this.props.setOrderUser(record); }}>{formatMessage({ id: 'page.Leads.order' })}</Link>
              </span>
            );
          } return '';
        };
        return (
          <span>
            <Tooltip title={formatMessage({ id: 'page.Accounts.userDetail' })}>
              <Icon
                type="user"
                onClick={() => {
              this.handleUserDetail(record);
            }}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title={formatMessage({ id: 'page.Accounts.editUser' })}>
              <Icon
                type="edit"
                onClick={() => {
              this.handleeditObj(record);
            }}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title={formatMessage({ id: 'page.Leads.editId' })}>
              <Button onClick={() => { this.handleEditID(record); }} size="small" className={idBtnClasses}><Icon type="picture" />ID</Button>
            </Tooltip>
            <Divider type="vertical" />
            <Button
              size="small"
              onClick={() => {
            this.handleHistoryOrder(record.id);
          }}
            >{formatMessage({ id: 'page.Accounts.historyOrder' })}
            </Button>

            { sendGoodsBtn() }

          </span>
        );
      },
    }];
    return (
      <div>
        <Table columns={columns} dataSource={accountsData} />
        <IdDialog {...this.state.editID} onOk={(idFront, idBack) => { this.handleIDSave(idFront, idBack); }} onCancel={() => { this.handleIDClose(); }} rejectReseason={this.state.editObj.rejectReseason || 0} />
        <LeadsAndAccountsEditAddDialog visible={this.state.userDialogVisible} editObject={this.state.editObj} onClose={() => { this.closeUserDialog(); }} userType="Accounts" operatorType={this.state.operatorType} update={updateAccounts} />
        <HistoryOrderDialog visible={this.state.historyOrderDialogVisble} onClose={() => { this.closeHistoryOrder(); }} />
      </div>
    );
  }
}

accountsTable.propTypes = {
  intl: intlShape.isRequired,
  setOrderUser: PropTypes.func.isRequired,
  accountsData: PropTypes.array.isRequired,
  accountsDataTablePagination: PropTypes.object.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  updateAccounts: PropTypes.func.isRequired,
};

const AccountsTable = injectIntl(accountsTable);
export default AccountsTable;
