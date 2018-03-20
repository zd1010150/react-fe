import React from 'react';
// import 'rc-input-number/assets/index.css';
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import { InputNumber, Currency } from 'components/ui/index';
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
    width: 100,
    render: (text, record) => <p className={cx('goods-product-name')}>{record.name}<br /><small className={cx('goods-product-sku')}>{record.sku}</small></p>,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.picture' }),
    key: 'picture',
    render: (text, record) => <img src={record.picture} alt="goods pic" className="product-thumbnail" />,
    width: 50,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.quantity' }),
    dataIndex: 'availableQuantity',
    key: 'availableQuantity',
    width: 60,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.unitPrice' }),
    key: 'unitPrice',
    render: (text, record) => <Currency value={record.unitPrice} />,
    width: 40,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.price' }),
    key: 'price',
    render: (text, record) => <Currency value={record.price} />,
    width: 40,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.recommendedPrice' }),
    key: 'recommendedPrice',
    render: (text, record) => <Currency value={record.recommendedPrice} />,
    width: 60,
  }, {
    title: formatMessage({ id: 'global.properNouns.goods.orderQuantity' }),
    key: 'orderQuantity',
    width: 150,
    render: (text, record) => (<InputNumber
      min={0}
      disabled={!goodsEnable}
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
    width: 130,
    render: (text, record) => (
      <span>
        <Button disabled={!goodsEnable} size="small" type="primary" shape="circle" onClick={() => { addGoodsToOrder(record, currentOrder); }} icon="shopping-cart" />
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
