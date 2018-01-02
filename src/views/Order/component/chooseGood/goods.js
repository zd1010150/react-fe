import React from 'react';
// import 'rc-input-number/assets/index.css';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import { InputNumber } from 'components/ui/index';
// import InputNumber from 'rc-input-number';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';


const cx = classNames.bind(styles);

const goods = ({
  goodsData, intl, addGoodsToCart, selectingGoods, goodsTablePagination, queryGoodsByPaging
}) => {
  const { formatMessage } = intl;
  const columns = [{
    title: formatMessage({ id: 'global.properNouns.goods.name' }),
    dataIndex: 'name',
    key: 'name',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.picture' }),
    key: 'picture',
    render: (text, record) => <img src={record.picture} alt="goods pic" className="product-thumbnail" />,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.currentQuantity' }),
    dataIndex: 'availableQuantity',
    key: 'availableQuantity',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.totalValue' }),
    dataIndex: 'totalValue',
    key: 'totalValue',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.unitPrice' }),
    dataIndex: 'unitPrice',
    key: 'unitPrice',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.recommendedPrice' }),
    dataIndex: 'recommendedPrice',
    key: 'recommendedPrice',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.orderQuantity' }),
    key: 'orderQuantity',
    render: (text, record) => (<InputNumber
      min={0}
      value={record.selectingQuantity}
      max={record.availableQuantity}
      onChange={(value) => {
       selectingGoods(record, value);
    }}
    />),
  },
  {
    title: formatMessage({ id: 'global.ui.table.action' }),
    key: 'action',
    render: (text, record) => (
      <span>
        <Button size="small" onClick={() => { addGoodsToCart(record); }}>{formatMessage({ id: 'global.ui.button.addGoodsToCart' })}</Button>
      </span>
    ),
  }];
  const pagination = {
    defaultCurrent: goodsTablePagination.currentPage,
    current: goodsTablePagination.currentPage,
    defaultPageSize: goodsTablePagination.perPage,
    pageSize: goodsTablePagination.perPage,
    total: goodsTablePagination.total,
    onChange(page, pageSize) {
      console.log(page, pageSize, '- --- pagintation change');
      queryGoodsByPaging(pageSize, page);
    },
  };
  return (
    <div className="block">
      <div className="block-content">
        <Table  columns={columns} dataSource={goodsData} pagination={pagination} className="choose-goods-table" rowKey="id"/>
      </div>
    </div>);
};

goods.defaultProps = {
  goodsData: [],
};
goods.propTypes = {
  intl: intlShape.isRequired,
  goodsData: PropTypes.array,
  addGoodsToCart: PropTypes.func.isRequired,
  selectingGoods: PropTypes.func.isRequired, // 加入到购物车的数量
  goodsTablePagination: PropTypes.object.isRequired,
  queryGoodsByPaging: PropTypes.func.isRequired,
};
const GoodsView = injectIntl(goods);
export default GoodsView;
