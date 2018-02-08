/* when track order didn't have the package info, display the order goods items */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { getUnitPrice } from 'utils/mathUtil';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Currency, Product } from 'components/ui/index';
import OrderFreightDetail from './orderFreightDetail';

const orderGoodsItem = ({
  intl, orderNumber, items, totalPrice, totalQuantity, freightSettingId,
}) => {
  const { formatMessage } = intl;
  const columns = [
    {
      title: formatMessage({ id: 'global.properNouns.goods.product' }),
      key: 'product',
      width: 350,
      render: (text, record) => (<Product product={record.product} />),
    }, {
      title: formatMessage({ id: 'global.properNouns.goods.quantity' }),
      dataIndex: 'quantity',
      width: 100,
    }, {
      title: formatMessage({ id: 'global.properNouns.goods.price' }),
      key: 'price',
      width: 100,
      render: (text, record) => <Currency value={getUnitPrice(record.amount, record.quantity)} />,
    }, {
      title: formatMessage({ id: 'global.properNouns.goods.totalPrice' }),
      key: 'amount',
      render: (text, record) => <Currency value={record.amount} />,
    }];
  const header = (
    <ul className={classNames('invoice-ul', 'invoice-table-header-ul')}>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.orderNo' }) }:
        </div>
        <div className="trade-info-dd">
          { orderNumber }
        </div>
        { freightSettingId ? <OrderFreightDetail freightSettingId={freightSettingId} /> : '' }
      </li>

    </ul>
  );
  const footer = (
    <ul className={classNames('invoice-ul', 'invoice-table-footer-ul')}>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.goods.totalPrice' }) }:
        </div>
        <div className="trade-info-dd">
          <Currency value={totalPrice} />
        </div>
      </li>

      <li>
        <div className="trade-info-dd">
          { formatMessage({ id: 'global.properNouns.total' }) } { totalQuantity } { formatMessage({ id: 'global.properNouns.item' }) }
        </div>
      </li>
    </ul>
  );

  return (
    <Table
      rowKey="id"
      className="invoice-table"
      columns={columns}
      dataSource={items}
      bordered
      pagination={false}
      title={() => header}
      footer={() => footer}
    />
  );
};
orderGoodsItem.defaultProps = {
  orderNumber: '',
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  freightSettingId: '',
};
orderGoodsItem.propTypes = {
  intl: intlShape.isRequired,
  orderNumber: PropTypes.string,
  items: PropTypes.array,
  totalPrice: PropTypes.number,
  totalQuantity: PropTypes.number,
  freightSettingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
const OrderGoodsItem = injectIntl(orderGoodsItem);
export default OrderGoodsItem;
