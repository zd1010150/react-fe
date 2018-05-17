import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popover, Button } from 'antd';
import { getUnitPrice } from 'utils/mathUtil';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { CARRIERS_CODE } from 'config/app.config';
import styles from '../TrackOrders.less';
import { Currency, OrderStatus, Logistics, Product } from 'components/ui/index';
import LogisticsDetail from './logisticsDetail';


const cx = classNames.bind(styles);

const detailOrder = ({
  intl, trackingNumber, items, detailInfo, status, logistic, updateTime, totalPrice, totalQuantity, carrierCode,
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
          { formatMessage({ id: 'global.properNouns.trackingNo' }) }:
        </div>
        <div className="trade-info-dd">
          { trackingNumber }
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.orderStatus' }) }:
        </div>
        <div className="trade-info-dd">
          <OrderStatus status={status} />
        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.logistics' }) }:
        </div>
        <div className="trade-info-dd">
          <Logistics freight={logistic} />&nbsp;
          {
            carrierCode === CARRIERS_CODE.EWE && detailInfo && detailInfo.length > 0 ?
            (
              <Popover content={<LogisticsDetail infos={detailInfo} />} title={formatMessage({ id: 'global.properNouns.logisticsDetail' })} >
                <Button className={classNames('icon-btn')} type="primary"> {formatMessage({ id: 'global.properNouns.logisticsDetail' })} &gt;&gt; </Button>
              </Popover>
            ) : ''
          }
          {
            carrierCode === CARRIERS_CODE.AUPOST ?
              <a href={`https://auspost.com.au/mypost/track/#/search?id=${trackingNumber}`} target="_blank">{formatMessage({ id: 'global.properNouns.logisticsDetail' })}  &gt;&gt; </a>
              : ''
          }

        </div>
      </li>
      <li>
        <div className="trade-info-dt">
          { formatMessage({ id: 'global.properNouns.updateDate' }) }:
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
  carrierCode: PropTypes.string,
};
const DetailOrder = injectIntl(detailOrder);
export default DetailOrder;
