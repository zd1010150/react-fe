import React from 'react';
// import PropTypes from 'prop-types';
import { Table, Button, Divider, Icon, Tooltip } from 'antd';
import { intlShape, injectIntl } from 'react-intl';

class leadsTable extends React.Component {
  constructor(props) {
    super(props);
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
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <Tooltip title="查看id">
            <Icon type="picture" />
          </Tooltip>
          <Divider type="vertical" />
          <Icon type="user" />
          <Divider type="vertical" />
          <Icon type="edit" />
          <Divider type="vertical" />
          <Icon type="user-delete" />
          <Divider type="vertical" />
          <Button type="primary" size="small">Order</Button>
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
    return <Table columns={columns} dataSource={data} />;
  }
}

leadsTable.propTypes = {
  intl: intlShape.isRequired,
};

const LeadsTable = injectIntl(leadsTable);
export default LeadsTable;
