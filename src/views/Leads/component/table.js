/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Table, Divider, Icon, Tooltip, Button } from 'antd';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import _ from 'lodash';
import { IdDialog, LeadsAndAccountsEditAddDialog } from 'components/page';
import DeleteDialog from './deleteDialog';
import operateType from 'components/page/LeadsAndAccountsEditAddDialog/flow/operateType';
import { Address, Username, Group } from 'components/ui/index';

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
  handleIDSave(idNumber, idFront, idBack) {
    const file = {
      front_id_doc: idFront,
      back_id_doc: idBack,
    };
    const postData = Object.assign({}, this.state.editLead, { file, id_number: idNumber });
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
    const idNumber = record.id_number;
    const rejectReseason = 0;
    const mapPath = {};
    record.document.forEach((r) => {
      mapPath[r.name] = r.path;
    });
    const editID = Object.assign({}, this.state.editID, {
      visible: true,
      userId: `${record.id}`,
      idFront: mapPath.front_id_doc || '',
      idBack: mapPath.back_id_doc || '',
      country: record.country,
      rejectReseason,
      idNumber,
      isEditable: record.is_editable,
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
      width: 150,
      render: (text, record) => <Username firstName={record.first_name} lastName={record.last_name} />,
    }, {
      title: formatMessage({ id: 'global.form.phone' }),
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    }, {
      title: formatMessage({ id: 'global.form.allAddress' }),
      render: (text, record) => <Address country={record.country} state={record.state} city={record.city} street={record.street} zipCode={record.zip_code} />,
      key: 'address',
      width: 200,
    }, {
      title: formatMessage({ id: 'global.form.email' }),
      dataIndex: 'email',
      key: 'email',
      width: 150,
    }, {
      title: formatMessage({ id: 'global.form.group' }),
      key: 'group',
      render: (text, record) => <Group groupId={record.sub_group_id} />,
    }, {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      width: 280,
      render: (text, record) => {
        const idBtnType = () => {
          if (Number(record.status) === 2) {
            return 'primary';
          }
          if (Number(record.status) === 3) {
            return 'danger';
          } return 'default';
        };

        const sendGoodsBtn = () => {
          if ((!_.isEmpty(record.street)) && (!_.isEmpty(record.city)) && (!_.isEmpty(record.state)) && (!_.isEmpty(record.country)) && (!_.isEmpty(record.zip_code))) {
            if (!record.enabled) {
              return (
                <Tooltip title={formatMessage({ id: 'page.Leads.clientDisabled' })}>
                  <Divider type="vertical" />
                  <a href="javascript:void(0)" className="a-btn disabled">{formatMessage({ id: 'page.Leads.order' })}</a>
                </Tooltip>
              );
            }
            return (
              <span>
                <Divider type="vertical" />
                <Link to={`/order?userId=${record.id}`} className="a-btn" onClick={() => { this.props.setOrderUser(record); }}>{formatMessage({ id: 'page.Leads.order' })}</Link>
              </span>
            );
          } return (<span><Divider type="vertical" /><Tooltip title={formatMessage({ id: 'page.Leads.complementAddressTip' })}><Icon type="warning" className="text-danger" /></Tooltip></span>);
        };
        return (
          <span>
            <Tooltip title={formatMessage({ id: 'page.Leads.userDetail' })}>
              <Icon type="user" onClick={() => { this.handleUserDetail(record); }} />
            </Tooltip>
            <Divider type="vertical" />
            {
              record.is_editable ? (
                <Tooltip title={formatMessage({ id: 'page.Leads.editUser' })}>
                  <Icon type="edit" onClick={() => { this.handleEditLead(record); }} />
                </Tooltip>
              ) : (
                <Tooltip title={formatMessage({ id: 'page.Leads.cantEditUser' })}>
                  <Icon type="edit" disabled />
                </Tooltip>
              )
            }
            {
              record.is_deletable ? (
                <span>
                  <Divider type="vertical" />
                  <Tooltip title={formatMessage({ id: 'page.Leads.deleteUser' })}>
                    <Icon type="delete" onClick={() => { this.handleDeleteLead(record.id); }} />
                  </Tooltip>
                </span>
              ) : ''
            }
            <Divider type="vertical" />
            <Tooltip title={formatMessage({ id: 'page.Leads.editId' })}>
              <Button onClick={() => { this.handleEditID(record); }} size="small" type={idBtnType()}><Icon type="picture" />ID</Button>
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
        fetchLeads(pageSize, page);
      },
    };
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.props.leadsData}
          pagination={pagination}
          rowClassName={(record) => {
          const enable = (!_.isEmpty(record.street)) && (!_.isEmpty(record.city)) && (!_.isEmpty(record.state)) && (!_.isEmpty(record.country)) && (!_.isEmpty(record.zip_code));
          if (!enable) {
            return 'error-row';
          }
        }}
        />
        <IdDialog {...this.state.editID} onOk={(idNumber, idFront, idBack) => { this.handleIDSave(idNumber, idFront, idBack); }} onCancel={() => { this.handleIDClose(); }} rejectReseason={this.state.editLead.reject_reason_id || 0} />
        <LeadsAndAccountsEditAddDialog visible={this.state.userDialogVisible} editObject={this.state.editLead} onClose={() => { this.closeUserDialog(); }} userType="Leads" operatorType={this.state.operatorType} update={updateLeads} />
        <DeleteDialog userId={this.state.deleteUserId} visible={this.state.deleteDialogVisible} onClose={() => { this.closeDeleteDialog(); }} onDelete={deleteLeads} />
      </div>
    );
  }
}
leadsTable.defaultProps = {
  affiliatedClientStatus: [],
};
leadsTable.propTypes = {
  intl: intlShape.isRequired,
  setOrderUser: PropTypes.func.isRequired,
  leadsData: PropTypes.array.isRequired,
  leadsDataTablePagination: PropTypes.object.isRequired,
  fetchLeads: PropTypes.func.isRequired,
  updateLeads: PropTypes.func.isRequired,
  deleteLeads: PropTypes.func.isRequired,
  affiliatedClientStatus: PropTypes.array,
};

const LeadsTable = injectIntl(leadsTable);
export default LeadsTable;
