import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { Logistics, Currency, Product } from 'components/ui/index';
import { getUnitPrice } from 'utils/mathUtil';
import styles from '../../Order.less';

const cx = classNames.bind(styles);

const invoice = ({
  intl, items,
}) => {
  const { formatMessage } = intl;
  const columns = [{
    title: formatMessage({ id: 'global.properNouns.goods.product' }),
    key: 'product',
    width: 350,
    align: 'center',
    render: (text, record) => (<Product product={record.product} />),
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.quantity' }),
    dataIndex: 'quantity',
    align: 'center',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.price' }),
    key: 'price',
    align: 'center',
    render: (text, record) => <Currency value={getUnitPrice(record.amount, record.quantity)} />,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.totalPrice' }),
    key: 'amount',
    align: 'center',
    render: (text, record) => <Currency value={record.amount} />,
  }];

  return (
    <Table
      rowKey="id"
      className={classNames('invoice-table')}
      columns={columns}
      dataSource={items}
      pagination={false}
    />
  );
};
invoice.defaultProps = {
  items: [],
};
invoice.propTypes = {
  intl: intlShape.isRequired,
  items: PropTypes.array,
};
const Invoice = injectIntl(invoice);
export default Invoice;
