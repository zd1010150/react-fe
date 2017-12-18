/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Tooltip } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { IdDialog } from 'src/components/page';


const mockId = {
  userId: '23333',
  idFront: 'http://img06.tooopen.com/images/20160921/tooopen_sy_179583447187.jpg',
  idBack: 'http://img2.3lian.com/2014/f5/158/d/86.jpg',
  visible: false,
};
class orderTable extends React.Component {
  state = {
    editID: mockId,
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

  // table action 操作
  handleEditID(record) {
    const editID = Object.assign({}, this.state.editID, {
      visible: true, userId: `${record.id}`, idFront: record.idFront, idBack: record.idBack,
    });
    this.setState(Object.assign({}, this.state, { editID }));
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
        </span>
      ),
    }];


    return (
      <div>
        <Table columns={columns} dataSource={orders} />
        <IdDialog {...this.state.editID} onOk={() => { this.handleIDSave(); }} onCancel={() => { this.handleIDClose(); }} />
      </div>
    );
  }
}
orderTable.defaultProps={
  orders: [],
}
orderTable.propTypes = {
  intl: intlShape.isRequired,
  orders: PropTypes.array,
};

const OrderTable = injectIntl(orderTable);
export default OrderTable;
