import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { intlShape, injectIntl } from 'react-intl';
import { Table, Button, Icon, Tooltip} from 'antd';
import { Address, Username } from 'components/ui/index';

const table = ({ intl, users, setSeletedUser, queryByPaging, chooseUserTablePagination }) => {
  const { formatMessage } = intl;
  const columns = [{
    title: formatMessage({ id: 'global.form.name' }),
    key: 'name',
    render: (text, record) => <Username firstName={record.first_name} lastName={record.last_name} />,
  }, {
    title: formatMessage({ id: 'global.form.phone' }),
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: formatMessage({ id: 'global.form.address' }),
    render: (text, record) => (
      <Address country={record.country} state={record.state} city={record.city} street={record.street} zipCode={record.zip_code} />
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
      const enable = (!_.isEmpty(record.street)) && (!_.isEmpty(record.city)) && (!_.isEmpty(record.state)) && (!_.isEmpty(record.country)) && (!_.isEmpty(record.zip_code));
      if (enable) {
        if (!record.enabled) {
          return (
            <Tooltip title={formatMessage({ id: 'page.Leads.clientDisabled' })}>
              <Button
                type="primary"
                size="small"
                disabled
              >{formatMessage({ id: 'global.ui.button.select' })}
              </Button>
            </Tooltip>
          );
        }
        return (
          <span>
            <Button
              type="primary"
              size="small"
              onClick={() => {
              setSeletedUser(record);
            }}
            >{formatMessage({ id: 'global.ui.button.select' })}
            </Button>
          </span>
        );
      }
      return (
        <span className="text-danger">
          <Icon type="warning" className="text-danger" />
          {formatMessage({ id: 'page.Leads.complementAddressTip' })}
        </span>);
    },
  }];
  const pagination = {
    defaultCurrent: chooseUserTablePagination.currentPage,
    current: chooseUserTablePagination.currentPage,
    defaultPageSize: chooseUserTablePagination.perPage,
    pageSize: chooseUserTablePagination.perPage,
    total: chooseUserTablePagination.total,
    onChange(page, pageSize) {
      queryByPaging(pageSize, page);
    },
  };
  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={pagination}
      rowClassName={(record) => {
      const enable = (!_.isEmpty(record.street)) && (!_.isEmpty(record.city)) && (!_.isEmpty(record.state)) && (!_.isEmpty(record.country)) && (!_.isEmpty(record.zip_code));
      if (!enable) {
        return 'error-row';
      }else return 'correct-row';
    }}
    />
  );
};
table.defaultProps = {
  users: [],
};
table.propTypes = {
  intl: intlShape.isRequired,
  users: PropTypes.array,
  setSeletedUser: PropTypes.func.isRequired,
  chooseUserTablePagination: PropTypes.object.isRequired,
  queryByPaging: PropTypes.func.isRequired,
};

const TableView = injectIntl(table);
export default TableView;
