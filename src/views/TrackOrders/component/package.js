import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popover, Button } from 'antd';
import { getUnitPrice } from 'utils/mathUtil';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import styles from '../TrackOrders.less';
import { Currency, OrderStatus, Logistics } from 'components/ui/index';
import LogisticsDetail from './logisticsDetail';

const cx = classNames.bind(styles);

const detailOrder = ({
  intl, trackingNumber, items, detailInfo, status, logistic, updateTime, totalPrice, totalQuantity,
}) => {
  const columns = [
    {
      title: 'Product Name',
      key: 'productName',
      dataIndex: 'product.name',
      width: 200,
    }, {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 100,
    }, {
      title: 'Price',
      key: 'price',
      width: 100,
      render: (text, record) => <Currency value={getUnitPrice(record.amount, record.quantity)} />,
    }, {
      title: 'Total Price',
      key: 'amount',
      render: (text, record) => <Currency value={record.amount} />,
    }];

  const header = (
    <ul className={classNames('invoice-ul', 'invoice-table-header-ul')}>
      <li>
        <div className="trade-info-dt">
          Tracking Number:
        </div>
        <div className="trade-info-dd">
          { trackingNumber }
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          Status:
        </div>
        <div className="trade-info-dd">
          <OrderStatus status={status} />
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          Logistics:
        </div>
        <div className="trade-info-dd">
          <Logistics freight={logistic} />
          {
            detailInfo && detailInfo.length > 0 ?
            (
              <Popover content={<LogisticsDetail infos={detailInfo} />} title="物流详情">
                <Button className={classNames('icon-btn')} type="primary"> 详情>> </Button>
              </Popover>
            ) : ''
          }

        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          UpdateTime:
        </div>
        <div className="trade-info-dd">
          { updateTime }
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
detailOrder.defaultProps = {
  trackingNumber: '',
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  detailInfo: [],
  status: 0,
  logistic: 0,
  updateTime: '',
};
detailOrder.propTypes = {
  intl: intlShape.isRequired,
  trackingNumber: PropTypes.string,
  items: PropTypes.array,
  detailInfo: PropTypes.array,
  status: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  logistic: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  updateTime: PropTypes.string,
  totalPrice: PropTypes.number,
  totalQuantity: PropTypes.number,
};
const DetailOrder = injectIntl(detailOrder);
export default DetailOrder;
