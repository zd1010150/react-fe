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
import { goNextStep, goPreviousStep, deleteSplitOrder, createDeliveryOrder } from '../skeleton/flow/action';
import { SAVED } from './flow/orderStatus';
import { CURRENCY_SYMBOL } from 'config/app.config';

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
    this.setMaxDuty(props);
  }
  setMaxDuty(props) {
    const { dutySetting } = props;
    const max = _.isEmpty(dutySetting) ? 300 : dutySetting[0].threshold;
    props.setMax(max); // mock
  }
  creatDeliveryOrder() {
    const postData = [];
    Object.keys(this.props.orders).forEach((orderid) => {
      const order = this.props.orders[orderid];
      if (order.goods && order.goods.length < 1) return;
      postData.push(order.goods.map(item => ({
        amount: item.price * item.quantity,
        product_id: item.id,
        quantity: item.quantity,
      })));
    });
    this.props.createDeliveryOrder(postData, 'splitOrder');
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
    const { formatMessage } = this.props.intl;
    let isAllNull = true;
    Object.keys(this.props.orders).forEach((key) => {
      isAllNull = isAllNull && _.isEmpty(this.props.orders[key].goods);
    });
    if (isAllNull) {
      Modal.error({
        title: formatMessage({ id: 'page.Order.cantGoChooselogistics' }),
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
    this.props.deleteSplitOrder();
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
      intl,
      baseCurency,
      max,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div className={cx('split-order-block')}>
        <Layout className={cx('split-order-content')}>
          <Content>
            <div className="block">
              <div className="block-title">
                <Button
                  size="small"
                  type="primary"
                  className={cx('create-sub-order-btn')}
                  onClick={createOrder}
                >
                  <Icon type="plus" />{ formatMessage({ id: 'global.properNouns.deliveryOrder' }) }
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
              symbol={_.isEmpty(baseCurency) ? '' : CURRENCY_SYMBOL[baseCurency[0].name]}
              max={max}
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
            <Icon type="arrow-left" /> { formatMessage({ id: 'global.ui.button.previous' }) }
          </Button>
          <Button
            className={cx('order-step-next-btn')}
            disabled={!ordersValidate}
            type="primary"
            onClick={() => {
              this.goNextStep();
        }}
          >
            { formatMessage({ id: 'global.ui.button.next' }) } <Icon type="arrow-right" />
          </Button>
        </div>
        <Modal
          title={formatMessage({ id: 'global.ui.dialog.info' })}
          visible={this.state.goPreviousStepConfirmDialogVisible}
          onOk={() => this.confirmGoPrevious()}
          onCancel={() => this.cancelPreviousDialog()}
          okText={formatMessage({ id: 'global.ui.button.ok' })}
          cancelText={formatMessage({ id: 'global.ui.button.cancel' })}
        >
          <p>{ formatMessage({ id: 'page.Order.leaveSplitOrder' }) }</p>
        </Modal>
        <Modal
          title={formatMessage({ id: 'global.ui.dialog.info' })}
          visible={this.state.hasRemainGoodsConfirmDialogVisible}
          onOk={() => this.confirmHasRemainGoods()}
          onCancel={() => this.cancelHasRemainGoods()}
          okText={formatMessage({ id: 'global.ui.button.ok' })}
          cancelText={formatMessage({ id: 'global.ui.button.cancel' })}
        >
          <p>{ formatMessage({ id: 'page.Order.leaveRestGoods' }) }</p>
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
  deleteSplitOrder: PropTypes.func.isRequired,
};
const mapStateToProps = ({ order, global }) => {
  const { splitOrder } = order;
  return {
    ordersValidate: splitOrder.orders.validate,
    orders: splitOrder.orders.orders,
    currentOrder: splitOrder.orders.currentOrder,
    goods: splitOrder.goods,
    goodsEnable: splitOrder.orders.goodsEnable,
    dutySetting: global.dutySetting,
    selectedUser: global.orderUser,
    baseCurency: global.settings.baseCurrency,
    max: splitOrder.orders.max,
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
  deleteSplitOrder,
  resetOrder,
  setMax,
  createDeliveryOrder,
};

const SplitOrderView = connect(mapStateToProps, mapDispathToProps)(injectIntl(splitOrderView));
export default SplitOrderView;
