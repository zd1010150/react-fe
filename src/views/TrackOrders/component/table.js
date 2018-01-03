/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table, Badge, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { IdDialog } from 'components/page';
import { Address } from 'components/ui/index';


class orderTable extends React.Component {

  handleTrackingNumberClick(trackOrder) {
    this.props.setTrackOrderDetailInfo(trackOrder);
    this.props.history.replace('/trackOrders/detail');
  }
  viewDetail(trackOrder) {
    this.props.setTrackOrderDetailInfo(trackOrder);
    this.props.history.replace('/trackOrders/detail');
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
    }, {
      title: formatMessage({ id: 'global.form.trackingNumber' }),
      key: 'trackingNumber',
      render: (text, record) => {
        const trackingNumbers = record.tracking_number;
        if (_.isEmpty(trackingNumbers)) {
          return '';
        } else if (trackingNumbers.length < 2) {
          return <a href="#" className="head-example" onClick={() => { this.handleTrackingNumberClick(record); }}>{trackingNumbers[0].tracking_number}</a>;
        }
        return (
          <Badge count={trackingNumbers.length} offset={[0,10]}>
            <a href="#" className="head-example" onClick={() => { this.handleTrackingNumberClick(record); }}>{trackingNumbers[0].tracking_number}</a>
          </Badge>
        );
      },
    }, {
      title: formatMessage({ id: 'global.form.receiver' }),
      key: 'receiver',
      render: (text, record) => {
        const { receiver } = record;
        return `${receiver.first_name} ${receiver.last_name}`;
      },
    },
    {
      title: formatMessage({ id: 'global.form.allAddress' }),
      render: (text, record) => <Address country={Number(record.receiver.country)} state={record.receiver.state} city={record.receiver.city} street={record.receiver.street} zipCode={record.receiver.zip_code} />,
      key: 'address',
    }, {
      title: formatMessage({ id: 'global.form.status' }),
      key: 'status',
      render: (text, record) => {
        const status = deliveryOrderStatus.filter(s => s.id === Number(record.status));
        const statusName = _.isEmpty(status) ? '' : status[0].name;
        return <span>{statusName}</span>;
      },
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
