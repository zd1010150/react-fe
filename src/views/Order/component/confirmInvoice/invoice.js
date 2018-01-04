import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import styles from '../../Order.less';
import { Logistics, Currency} from 'components/ui/index';

const cx = classNames.bind(styles);
const invoice = ({
  intl, orderNumber, trackingNumber, freightSetting, items, totalPrice, totalQuantity, shippingCost, orderTime,
}) => {
  const columns = [{
    title: 'Product ID',
    dataIndex: 'product_id',
  }, {
    title: 'Product Name',
    key: 'productName',
    render: () => (<span> 爱他美奶粉 一段900 克 2-3 岁</span>),
  }, {
    title: 'Quantity',
    dataIndex: 'quantity',
  }, {
    title: 'Price',
    key: 'price',
    render: () => ('10.00'),
  }, {
    title: 'Total Price',
    dataIndex: 'amount_cny',
  }];

  const header = (
    <ul className={classNames('invoice-ul', 'invoice-table-header-ul')}>
      <li>
        <div className="trade-info-dt">
            Order Number:
        </div>
        <div className="trade-info-dd">
          { orderNumber }
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
            Tracking Number
        </div>
        <div className="trade-info-dd">
          { trackingNumber }
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          Logistics:
        </div>
        <div className="trade-info-dd">
          <Logistics freight={freightSetting} />
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          Order Time:
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
          Total Price:
        </div>
        <div className="trade-info-dd">
          <Currency value={totalPrice} />
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          Shipping Cost:
        </div>
        <div className="trade-info-dd">
          <Currency value={shippingCost} />
        </div>
      </li>
      <li>
        <div className="trade-info-dd">
            Total { totalQuantity } Item
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
