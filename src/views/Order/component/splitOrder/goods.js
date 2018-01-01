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
  goodsData, intl, addGoodsToOrder, currentOrder, selectingGoods, goodsEnable,
}) => {
  const { formatMessage } = intl;
  const columns = [{
    title: formatMessage({ id: 'global.properNouns.goods.name' }),
    key: 'name',
    dataIndex: 'name',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.picture' }),
    key: 'picture',
    render: (text, record) => <img src={record.picture} alt="goods pic" className="product-thumbnail" />,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.currentQuantity' }),
    dataIndex: 'availableQuantity',
    key: 'availableQuantity',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.unitPrice' }),
    dataIndex: 'unitPrice',
    key: 'unitPrice',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.price' }),
    dataIndex: 'price',
    key: 'price',
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.orderQuantity' }),
    key: 'orderQuantity',
    render: (text, record) => (<InputNumber
      min={0}
      disabled={!goodsEnable}
      value={record.selectingQuantity}
      max={record.availableQuantity}
      onChange={(value) => {
        console.log('selectingQuantity:', record.selectingQuantity, 'availableQuantity:', record.availableQuantity, value, 'the goods change');
       selectingGoods(record, value);
    }}
    />),
  },
  {
    title: formatMessage({ id: 'global.ui.table.action' }),
    key: 'action',
    render: (text, record) => (
      <span>
        <Button disabled={!goodsEnable} size="small" onClick={() => { addGoodsToOrder(record, currentOrder); }}>{formatMessage({ id: 'global.ui.button.addGoodsToCart' })}</Button>
      </span>
    ),
  }];
  return (
    <Table columns={columns} dataSource={goodsData} className="choose-goods-table" />
  );
};

goods.defaultProps = {
  goodsData: [],
};
goods.propTypes = {
  intl: intlShape.isRequired,
  goodsData: PropTypes.array,
  goodsEnable: PropTypes.bool.isRequired,
  selectingGoods: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired,
  addGoodsToOrder: PropTypes.func.isRequired, // 加入到购物车的数量
};
const GoodsView = injectIntl(goods);
export default GoodsView;
