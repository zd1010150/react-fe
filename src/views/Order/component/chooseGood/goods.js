import React from 'react';
import 'rc-input-number/assets/index.css';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import InputNumber from 'rc-input-number';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';


const cx = classNames.bind(styles);

const goods = ({
  goodsData, intl, addGoodsToCart, selectingGoods,
}) => {
  const { formatMessage } = intl;
  const columns = [{
    title: formatMessage({ id: 'global.properNouns.goods.id' }),
    key: 'id',
    dataIndex: 'id',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.name' }),
    key: 'name',
    dataIndex: 'name',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.picture' }),
    key: 'picture',
    render: text => <img src={text} alt="goods pic" />,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.category' }),
    dataIndex: 'category',
    key: 'category',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.currentQuantity' }),
    dataIndex: 'availableQuantity',
    key: 'availableQuantity',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.lastUpdated' }),
    dataIndex: 'lastUpdated',
    key: 'lastUpdated',
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
        console.log(value, "the goods change");
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
  return (
    <div className="block">
      <div className="block-content">
        <Table columns={columns} dataSource={goodsData} />
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
};
const GoodsView = injectIntl(goods);
export default GoodsView;
