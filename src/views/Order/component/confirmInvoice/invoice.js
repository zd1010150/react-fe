import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Logistics, Currency, Product } from 'components/ui/index';
import { getUnitPrice } from 'utils/mathUtil';

const invoice = ({
  intl, orderNumber, trackingNumber, freightSetting, items, totalPrice, totalQuantity, shippingCost, orderTime,
}) => {
  const { formatMessage } = intl;
  const columns = [{
    title: formatMessage({ id: 'global.properNouns.goods.product' }),
    key: 'product',
    width: 350,
    render: (text, record) => (<Product product={record.product} />),
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.quantity' }),
    dataIndex: 'quantity',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.price' }),
    key: 'price',
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
          { formatMessage({ id: 'global.properNouns.orderNo' }) }
        </div>
        <div className="trade-info-dd">
          { orderNumber }
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.trackingNo' }) }
        </div>
        <div className="trade-info-dd">
          { trackingNumber }
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.logistics' }) }
        </div>
        <div className="trade-info-dd">
          <Logistics freight={freightSetting} />
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.orderDate' }) }
        </div>
        <div className="trade-info-dd">
          { orderTime }
        </div>
      </li>
    </ul>
  );
  const footer = (
    <ul className={classNames('invoice-ul', 'invoice-table-footer-ul')}>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.goods.totalPrice' }) }
        </div>
        <div className="trade-info-dd">
          <Currency value={totalPrice} />
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.goods.shippingCost' }) }
        </div>
        <div className="trade-info-dd">
          <Currency value={shippingCost} />
        </div>
      </li>
      <li>
        <div className="trade-info-dd">
          { formatMessage({ id: 'global.properNouns.total' }) }
          { totalQuantity }
          { formatMessage({ id: 'global.properNouns.item' }) }

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
invoice.defaultProps = {
  items: [],
  totalPrice: 0,
  shippingCost: 0,
  orderTime: '',
  totalQuantity: 0,
  freightSetting: 0,
};
invoice.propTypes = {
  intl: intlShape.isRequired,
  orderNumber: PropTypes.string.isRequired,
  trackingNumber: PropTypes.string.isRequired,
  freightSetting: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  items: PropTypes.array,
  totalPrice: PropTypes.number,
  totalQuantity: PropTypes.number,
  shippingCost: PropTypes.number,
  orderTime: PropTypes.string,
};
const Invoice = injectIntl(invoice);
export default Invoice;
