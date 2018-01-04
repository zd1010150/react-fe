/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table, Badge, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { Address, OrderStatus } from 'components/ui/index';


class orderTable extends React.Component {
  viewDetail(trackOrder) {
    this.props.setTrackOrderDetailInfo(trackOrder);
    this.props.history.replace('/trackOrders?view=detail');
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      orders, queryByPaging, trackOrderDataTablePagination, deliveryOrderStatus,
    } = this.props;
    const columns = [{
      title: formatMessage({ id: 'global.form.orderNumber' }),
      key: 'orderNumber',
      dataIndex: 'order_number',
      width: 200,
    }, {
      title: formatMessage({ id: 'global.form.trackingNumber' }),
      key: 'trackingNumber',
      width: 180,
      render: (text, record) => {
        const trackingNumbers = record.tracking_number;
        if (_.isEmpty(trackingNumbers)) {
          return '';
        } else if (trackingNumbers.length < 2) {
          return <a href="javascript:void(0)" className="head-example" onClick={() => { this.viewDetail(record); }}>{trackingNumbers[0].tracking_number}</a>;
        }
        return (
          <Badge count={trackingNumbers.length} offset={[0,10]}>
            <a href="javascript:void(0)" className="head-example" onClick={() => { this.viewDetail(record); }}>{trackingNumbers[0].tracking_number}</a>
          </Badge>
        );
      },
    }, {
      title: formatMessage({ id: 'global.form.receiver' }),
      key: 'receiver',
      width: 150,
      render: (text, record) => {
        const { receiver } = record;
        return `${receiver.first_name} ${receiver.last_name}`;
      },
    },
    {
      title: formatMessage({ id: 'global.form.allAddress' }),
      render: (text, record) => <Address country={Number(record.receiver.country)} state={record.receiver.state} city={record.receiver.city} street={record.receiver.street} zipCode={record.receiver.zip_code} />,
      key: 'address',
      width: 250,
    }, {
      title: formatMessage({ id: 'global.form.status' }),
      key: 'status',
      render: (text, record) => <OrderStatus status={record.status} />,
    },
    {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => { this.viewDetail(record); }} size="small">查看详情</Button>
        </span>
      ),
    }];
    const pagination = {
      defaultCurrent: trackOrderDataTablePagination.currentPage,
      current: trackOrderDataTablePagination.currentPage,
      defaultPageSize: trackOrderDataTablePagination.perPage,
      pageSize: trackOrderDataTablePagination.perPage,
      total: trackOrderDataTablePagination.total,
      onChange(page, pageSize) {
        queryByPaging(pageSize, page);
      },
    };

    return (
      <div>
        <Table columns={columns} dataSource={orders} pagination={pagination} rowKey="id" />
      </div>
    );
  }
}
orderTable.defaultProps = {
  orders: [],
  deliveryOrderStatus: [],
  countries: [],
};
orderTable.propTypes = {
  intl: intlShape.isRequired,
  orders: PropTypes.array,
  queryByPaging: PropTypes.func.isRequired,
  setTrackOrderDetailInfo: PropTypes.func.isRequired,
  trackOrderDataTablePagination: PropTypes.object.isRequired,
  deliveryOrderStatus: PropTypes.array,
  history: PropTypes.object.isRequired,
};

const OrderTable = injectIntl(orderTable);
export default OrderTable;
