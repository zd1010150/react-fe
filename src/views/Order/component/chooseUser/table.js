import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { intlShape, injectIntl } from 'react-intl';
import { Table, Button } from 'antd';

const table = ({ intl, users, setSeletedUser }) => {
  const { formatMessage } = intl;
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
      <span>{record.street} {record.city} {record.state} {record.state} {record.country} {record.zipCode}</span>
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
      const disabled = record.document && record.document.length < 2;
      return (
        <span>
          <Button
            size="small"
            disabled={disabled}
            onClick={() => {
          setSeletedUser(record);
        }}
          >{formatMessage({ id: 'global.ui.button.select' })}
          </Button>
        </span>
      );
    },
  }];
  return (
    <Table columns={columns} dataSource={users} rowKey="id" pagination={false} />
  );
};
table.defaultProps = {
  users: [],
};
table.propTypes = {
  intl: intlShape.isRequired,
  users: PropTypes.array,
  setSeletedUser: PropTypes.func.isRequired,
};

const TableView = injectIntl(table);
export default TableView;
