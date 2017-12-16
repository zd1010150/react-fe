import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Layout, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';
import Orders from './orders';
import Goods from './goods';
import { selectingGoods, addGoodsToOrder, setOrderStatus, createOrder, deleteOrder, deleteOrderGoods, setOrderGoodsQuantity, updateGoodsStatus } from './flow/action';

const { Sider, Content } = Layout;

const cx = classNames.bind(styles);

const splitOrderView = ({
  ordersBorderCollapse,
  orders,
  goods,
  currentOrder,
  goodsEnable,
  selectingGoods,
  addGoodsToOrder,
  setOrderStatus,
  createOrder,
  deleteOrder,
  deleteOrderGoods,
  setOrderGoodsQuantity,
  updateGoodsStatus,
}) => {
  return (<div className={cx('section')}>
    <Layout>
      <Content>
        <Button onClick={createOrder}>创建子订单</Button>
        <Goods
          goodsEnable={goodsEnable}
          goodsData={goods}
          currentOrder={currentOrder}
          addGoodsToOrder={addGoodsToOrder}
          selectingGoods={selectingGoods}
        />
      </Content>
      <Icon
        className="trigger"
        type={ ordersBorderCollapse ? 'menu-unfold' : 'menu-fold'}
      />
      <Sider
        trigger={null}
        collapsible
        collapsed={ordersBorderCollapse}
        collapsedWidth={0}
        className={cx('sidebar-cart')}
        width={300}
      >
        <Orders
        ordersData={orders}
        deleteOrderGoods={deleteOrderGoods}
        setOrderGoodsQuantity={setOrderGoodsQuantity}
        deleteOrder={deleteOrder}
        setOrderStatus={setOrderStatus}
        currentOrder={currentOrder}
        />
      </Sider>
    </Layout>
  </div>);
}


splitOrderView.propTypes = {
  intl: intlShape.isRequired,
};
const mapStateToProps = ({ order }) => {
  const { splitOrder } = order;
  return {
    orders: splitOrder.orders.orders,
    currentOrder: splitOrder.orders.currentOrder,
    goods: splitOrder.goods,
    goodsEnable: splitOrder.orders.goodsEnable,
  }
};
const mapDispathToProps = {
  selectingGoods,
  addGoodsToOrder,
  setOrderStatus,
  createOrder,
  deleteOrder,
  deleteOrderGoods,
  setOrderGoodsQuantity,
};

const SplitOrderView = connect(mapStateToProps, mapDispathToProps)(injectIntl(splitOrderView));
export default SplitOrderView;
