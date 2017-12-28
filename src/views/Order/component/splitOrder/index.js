import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon, Layout, Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';
import Orders from './orders';
import Goods from './goods';
import { selectingGoods, addGoodsToOrder, setOrderStatus, createOrder, deleteOrder, deleteOrderGoods, setOrderGoodsQuantity, resetOrder, setMax } from './flow/action';
import { goNextStep, goPreviousStep, createDeliveryOrder } from '../skeleton/flow/action';
import { SAVED } from './flow/orderStatus';

const { Sider, Content } = Layout;

const cx = classNames.bind(styles);

class splitOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goPreviousStepConfirmDialogVisible: false,
      hasRemainGoodsConfirmDialogVisible: false, // 商品没有分单完成，还有余下的商品没有分完
      errorMsg: '',
    };
    props.setMax(300); // mock
  }
  creatDeliveryOrder() {
    const postData = [];
    Object.keys(this.props.orders).forEach((orderid) => {
      const order = this.props.orders[orderid];
      if (order.goods && order.goods.length < 1) return;
      postData.push(order.goods.map(item => ({
        price: item.price,
        product_id: item.id,
        quantity: item.quantity,
      })));
    });
    this.props.goNextStep('splitOrder');
    //this.props.createDeliveryOrder(postData);
  }
  confirmHasRemainGoods() {
    this.setState({
      hasRemainGoodsConfirmDialogVisible: false,
    });
    this.creatDeliveryOrder();
  }
  cancelHasRemainGoods() {
    this.setState({
      hasRemainGoodsConfirmDialogVisible: false,
    });
  }
  goNextStep() {
    if (_.isEmpty(this.props.orders)) {
      Modal.error({
        title: '你还没有创建任何发货单，不能进行下一步',
      });
      return;
    }
    const isAllBeAdded = this.props.goods.reduce(
      (isAllbeAdded, item) =>
        isAllbeAdded && (item.availableQuantity === 0),
      true,
    ); // 第一步： 判断是否有剩余的商品没有添加
    if (!isAllBeAdded) {
      this.setState({
        hasRemainGoodsConfirmDialogVisible: true,
      });
      return;
    }
    this.creatDeliveryOrder();
  }
  goPreviousStep() {
    this.setState({
      goPreviousStepConfirmDialogVisible: true,
    });
  }
  confirmGoPrevious() {
    this.setState({
      goPreviousStepConfirmDialogVisible: false,
    });
    this.props.resetOrder();
    this.props.goPreviousStep('splitOrder');
  }
  cancelPreviousDialog() {
    this.setState({
      goPreviousStepConfirmDialogVisible: false,
    });
  }
  render() {
    const {
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
      ordersValidate,
    } = this.props;

    return (
      <div className={cx('split-order-block')}>
        <Layout className={cx('split-order-content')}>
          <Content>
            <div className="block">
              <div className="block-title">
                <strong>已选商品</strong>
                <Button
                  size="small"
                  type="primary"
                  className={cx('create-sub-order-btn')}
                  onClick={createOrder}
                >
                  <Icon type="plus" />发货单
                </Button>
              </div>
              <div className="block-content">
                <Goods
                  goodsEnable={goodsEnable}
                  goodsData={goods}
                  currentOrder={currentOrder}
                  addGoodsToOrder={addGoodsToOrder}
                  selectingGoods={selectingGoods}
                />
              </div>
            </div>
            <span className="text-danger">{this.state.errorMsg}</span>
          </Content>
          {
            /* <Icon className="trigger" type={ordersBorderCollapse ? 'menu-unfold' : 'menu-fold'} /> */
          }
          <Sider
            trigger={null}
            collapsible
            collapsed={ordersBorderCollapse}
            collapsedWidth={0}
            className={classNames(cx('sidebar-cart'), 'sidebar-cart')}
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
        <div className="block-footer">
          <Button
            className={cx('order-step-previous-btn')}
            onClick={() => {
          this.goPreviousStep();
        }}
          >
            <Icon type="arrow-left" /> previous
          </Button>
          <Button
            className={cx('order-step-next-btn')}
            disabled={!ordersValidate}
            type="primary"
            onClick={() => {
              this.goNextStep();
        }}
          >
          next <Icon type="arrow-right" />
          </Button>
        </div>
        <Modal
          title="Modal"
          visible={this.state.goPreviousStepConfirmDialogVisible}
          onOk={() => this.confirmGoPrevious()}
          onCancel={() => this.cancelPreviousDialog()}
          okText="确认"
          cancelText="取消"
        >
          <p>离开本页面，你目前创建的订单将全部丢失，确定继续？</p>
        </Modal>
        <Modal
          title="Modal"
          visible={this.state.hasRemainGoodsConfirmDialogVisible}
          onOk={() => this.confirmHasRemainGoods()}
          onCancel={() => this.cancelHasRemainGoods()}
          okText="确认"
          cancelText="取消"
        >
          <p>你挑选的商品，还有部分未分配到子发货单中，确定继续？</p>
        </Modal>
      </div>
    );
  }
}


splitOrderView.propTypes = {
  intl: intlShape.isRequired,
  resetOrder: PropTypes.func.isRequired,
  createDeliveryOrder: PropTypes.func.isRequired,
  setMax: PropTypes.func.isRequired,
  goPreviousStep: PropTypes.func.isRequired,
  goNextStep: PropTypes.func.isRequired,
  goods: PropTypes.array.isRequired,
};
const mapStateToProps = ({ order }) => {
  const { splitOrder } = order;
  return {
    ordersValidate: splitOrder.orders.validate,
    orders: splitOrder.orders.orders,
    currentOrder: splitOrder.orders.currentOrder,
    goods: splitOrder.goods,
    goodsEnable: splitOrder.orders.goodsEnable,
  };
};
const mapDispathToProps = {
  selectingGoods,
  addGoodsToOrder,
  setOrderStatus,
  createOrder,
  deleteOrder,
  deleteOrderGoods,
  setOrderGoodsQuantity,
  goNextStep,
  goPreviousStep,
  resetOrder,
  setMax,
  createDeliveryOrder,
};

const SplitOrderView = connect(mapStateToProps, mapDispathToProps)(injectIntl(splitOrderView));
export default SplitOrderView;
