/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Table, Divider, Icon, Tooltip, Button } from 'antd';
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
  handleIDSave(idFront, idBack) {
    const file = {
      file: {
        front_id_doc: idFront,
        back_id_doc: idBack,
      },
    };
    const postData = Object.assign({}, this.state.editLead, { file });
    this.props.updateLeads(postData);
    this.handleIDClose();
  }
  closeDeleteDialog() {
    this.setState(Object.assign({}, this.state, {
      deleteDialogVisible: false,
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
        const { name, path } = record.document[1];
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
    this.setState(Object.assign({}, this.state, { editID, editLead: record }));
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
            <Tooltip title={formatMessage({ id: 'page.Leads.editId' })}>
              <Button onClick={() => { this.handleEditID(record); }} size="small" className={idBtnClasses}><Icon type="picture" />ID</Button>
            </Tooltip>
            { sendGoodsBtn() }
          </span>
        );
      },
    }];
    const {
      leadsDataTablePagination, updateLeads, deleteLeads, fetchLeads,
    } = this.props;
    const pagination = {
      defaultCurrent: leadsDataTablePagination.currentPage,
      current: leadsDataTablePagination.currentPage,
      defaultPageSize: leadsDataTablePagination.perPage,
      pageSize: leadsDataTablePagination.perPage,
      total: leadsDataTablePagination.total,
      onChange(page, pageSize) {
        console.log(page, pageSize, '- --- pagintation change');
        fetchLeads(pageSize, page);
      },
    };
    console.log(pagination.current, pagination.total, pagination.pageSize, '- --- table render');
    return (
      <div>
        <Table columns={columns} dataSource={this.props.leadsData} pagination={pagination} />
        <IdDialog {...this.state.editID} onOk={(idFront, idBack) => { this.handleIDSave(idFront, idBack); }} onCancel={() => { this.handleIDClose(); }} rejectReseason={this.state.editLead.rejectReseason || 0} />
        <LeadsAndAccountsEditAddDialog visible={this.state.userDialogVisible} editObject={this.state.editLead} onClose={() => { this.closeUserDialog(); }} userType="Leads" operatorType={this.state.operatorType} update={updateLeads} />
        <DeleteDialog userId={this.state.deleteUserId} visible={this.state.deleteDialogVisible} onClose={() => { this.closeDeleteDialog(); }} onDelete={deleteLeads} />
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
  deleteLeads: PropTypes.func.isRequired,
};

const LeadsTable = injectIntl(leadsTable);
export default LeadsTable;
