/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table, Badge, Button, Divider, Popconfirm } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import { Address, OrderStatus } from 'components/ui/index';
import { UNPAIED_ORDER_STATUS } from 'config/app.config.js';

class orderTable extends React.Component {
  viewDetail(trackOrder) {
    this.props.setTrackOrderDetailInfo(trackOrder);
    this.props.history.replace('/trackOrders?view=detail');
  }
  handlePaymentOrder(develiverOrder) {
    if (!_.isEmpty(develiverOrder.invoices)) {
      const {
        setInvoiceInfo,
        setDeliveryOrders,
        getTotalLogisticFee,
      } = this.props;
      const invoices = [develiverOrder.invoices];
      const deliveryOrders = [develiverOrder.id];
      const logisticType = develiverOrder.shipping_type;

      setInvoiceInfo(invoices);
      setDeliveryOrders(deliveryOrders);
      getTotalLogisticFee(logisticType, deliveryOrders);
    }

    this.props.history.push(`/clientLists/order?needCreateBatchCreate=${_.isEmpty(develiverOrder.invoices)}&deliveryOrderId=${develiverOrder.id}`);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      orders,
      queryByPaging,
      trackOrderDataTablePagination,
      deleteDeliveryOrder,
    } = this.props;
    const columns = [{
      title: formatMessage({ id: 'global.form.orderNumber' }),
      key: 'orderNumber',
      dataIndex: 'order_number',
      width: 100,
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
          <Badge count={trackingNumbers.length} offset={[0, 10]}>
            <a href="javascript:void(0)" className="head-example" onClick={() => { this.viewDetail(record); }}>{trackingNumbers[0].tracking_number}</a>
          </Badge>
        );
      },
    }, {
      title: formatMessage({ id: 'global.form.receiver' }),
      key: 'receiver',
      width: 100,
      render: (text, record) => {
        const { receiver } = record;
        return `${receiver.first_name} ${receiver.last_name}`;
      },
    },
    {
      title: formatMessage({ id: 'global.form.allAddress' }),
      render: (text, record) => <Address country={record.receiver.country} state={record.receiver.state} city={record.receiver.city} street={record.receiver.street} zipCode={record.receiver.zip_code} />,
      key: 'address',
      width: 200,
    }, {
      title: formatMessage({ id: 'global.form.status' }),
      key: 'status',
      render: (text, record) => <OrderStatus status={record.status} />,
    },
    {
      title: formatMessage({ id: 'global.ui.table.action' }),
      key: 'action',
      width: 300,
      render: (text, record) => {
        const paymentEl = ((status) => {
          if (Number(status) === UNPAIED_ORDER_STATUS) {
            return (
              <span>
                <Button onClick={() => { this.handlePaymentOrder(record); }} size="small" type="primary">{ formatMessage({ id: 'global.ui.button.pay' }) }</Button>
                <Divider type="vertical" />
                <Popconfirm title={formatMessage({ id: 'page.TrackOrders.deleteDeliverOrder' })} onConfirm={()=> deleteDeliveryOrder(record.id)} okText={formatMessage({ id: 'global.ui.button.ok' })} cancelText={formatMessage({ id: 'global.ui.button.cancel' })}>
                  <Button  size="small">{ formatMessage({ id: 'global.ui.button.delete' }) }</Button>
                </Popconfirm>
                <Divider type="vertical" />
              </span>
            );
          }
          return '';
        })(record.status);
        return (
          <span>
            {paymentEl}
            <Button onClick={() => { this.viewDetail(record); }} size="small">{ formatMessage({ id: 'global.ui.button.detail' }) }</Button>
          </span>
        );
      },
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
  getTotalLogisticFee: PropTypes.func.isRequired,
  setDeliveryOrders: PropTypes.func.isRequired,
  setInvoiceInfo: PropTypes.func.isRequired,
  deleteDeliveryOrder: PropTypes.func.isRequired,
};

const OrderTable = injectIntl(orderTable);
export default OrderTable;
