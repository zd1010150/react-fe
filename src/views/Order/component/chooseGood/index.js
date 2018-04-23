import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon, Layout, Button, Modal } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { CHINA_CODE, MAX_PAYABLE_PRICE } from 'config/app.config';
import styles from '../../Order.less';
import Cart from './cart';
import Search from './search';
import Goods from './goods';
import { setCarCollapse, queryGoodsByPaging, queryBySearchKey, selectingGoods, addGoodsToCart, deleteGoodsFromCart, editingCartGoods,  setNextBtnDisable, setEditingPriceStatus, setEditingPrice } from './flow/action.js';
import { createDeliveryOrder, addSplitOrder, deleteSplitOrder, goPreviousStep, goNextStep } from '../skeleton/flow/action';
import { initGoods } from '../splitOrder/flow/action';
import { setNeedCreateInvoice } from 'views/Order/component/chooseLogistic/flow/action';

const { Sider, Content, Footer } = Layout;

const cx = classNames.bind(styles);

class chooseGoodView extends React.Component {
  state={
    showDutyTermsDialog: false,
  }
  componentDidMount() {
    this.props.queryGoodsByPaging();
  }
  submitOrder() {
    const {
      totalDuty, cart, createDeliveryOrder, deleteSplitOrder, dutySetting, selectedUser, setNeedCreateInvoice,
    } = this.props;
    const max = _.isEmpty(dutySetting) ? MAX_PAYABLE_PRICE : dutySetting.threshold;
    const { country } = selectedUser;
    if (totalDuty > max && country === CHINA_CODE) { // 如果超过duty setting,并且是发往中国 就分单
      this.setState({
        showDutyTermsDialog: true,
      });
    } else {
      const postData = cart.map(item => ({
        amount: item.price * item.quantity,
        product_id: item.id,
        quantity: item.quantity,
      }));
      createDeliveryOrder([postData], 'chooseGoods');
      deleteSplitOrder();
      setNeedCreateInvoice(true);
    }
  }
  confirmSplitOrder(){
    const {
      cart, addSplitOrder, initGoods, goNextStep
    } = this.props;
    this.setState({
      showDutyTermsDialog: false,
    });
    addSplitOrder();
    initGoods(cart);
    goNextStep('chooseGoods');
  }
  cancelSplitOrder(){
    this.setState({
      showDutyTermsDialog: false
    });
  }
  render() {
    const {
      setCarCollapse,
      queryGoodsByPaging,
      queryBySearchKey,
      selectingGoods,
      addGoodsToCart,
      deleteGoodsFromCart,
      editingCartGoods,
      goods,
      cart,
      cartCollapse,
      totalItemQuantity,
      totalPrice,
      totalCost,
      totalDuty,
      goodsTablePagination,
      steps,
      goPreviousStep,
      nextBtnDisabled,
      setNextBtnDisable,
      setEditingPriceStatus,
      setEditingPrice,
      dutySetting,
      intl,
    } = this.props;
    const { formatMessage } = intl;
    return (
      <div className={cx('choose-good-block')}>
        <Layout className={cx('choose-good-block-content')}>
          <Content>
            <Search queryGoods={queryBySearchKey} />
            <Goods
              goodsData={goods}
              addGoodsToCart={addGoodsToCart}
              selectingGoods={selectingGoods}
              queryGoodsByPaging={queryGoodsByPaging}
              goodsTablePagination={goodsTablePagination}
            />
          </Content>
          {/* <Icon
            className="trigger"
            type={cartCollapse ? 'menu-unfold' : 'menu-fold'}
            onClick={() => { setCarCollapse(!cartCollapse); }}
          /> */}
          <Sider
            trigger={null}
            collapsible
            collapsed={cartCollapse}
            collapsedWidth={0}
            className={cx('sidebar-cart')}
            width={380}
          >
            <Cart
              cartData={cart}
              deleteGoods={deleteGoodsFromCart}
              editingCartGoods={editingCartGoods}
              totalItemQuantity={totalItemQuantity}
              totalPrice={totalPrice}
              totalCost={totalCost}
              totalDuty={totalDuty}
              setNextBtnDisable={setNextBtnDisable}
              setEditingPriceStatus={setEditingPriceStatus}
              setEditingPrice={setEditingPrice}
            />
          </Sider>
        </Layout>
        <div className="block-footer">
          <Button
            className={cx('order-step-previous-btn')}
            style={{ marginLeft: 8 }}
            onClick={() => {
                goPreviousStep('chooseGoods');
              }}
          >
            <Icon type="arrow-left" /> { formatMessage({ id: 'global.ui.button.previous' }) }
          </Button>
          <Button
            className={cx('order-step-next-btn')}
            type="primary"
            style={{ marginLeft: 8 }}
            disabled={cart.length < 1}
            onClick={() => {
                this.submitOrder();
              }}
          >
            { formatMessage({ id: 'global.ui.button.next' }) } <Icon type="arrow-right" />
          </Button>
        </div>
        <Modal
          title={formatMessage({ id: 'global.ui.dialog.info' })}
          visible={this.state.showDutyTermsDialog}
          onOk={() => this.confirmSplitOrder()}
          onCancel={() => this.cancelSplitOrder()}
          okText={formatMessage({ id: 'global.ui.button.ok' })}
          cancelText={formatMessage({ id: 'global.ui.button.cancel' })}
        >
          <p>{ dutySetting && dutySetting.terms }</p>
        </Modal>
      </div>
    );
  }
}


chooseGoodView.propTypes = {
  intl: intlShape.isRequired,
  queryGoodsByPaging: PropTypes.func.isRequired,
};
const mapStateToProps = ({ order, global }) => ({
  goods: order.chooseGood.goods,
  cart: order.chooseGood.cart.goods,
  totalCost: order.chooseGood.cart.totalCost,
  totalItemQuantity: order.chooseGood.cart.totalItemQuantity,
  totalPrice: order.chooseGood.cart.totalPrice,
  totalDuty: order.chooseGood.cart.totalDuty,
  cartCollapse: order.chooseGood.cartCollapse,
  goodsTablePagination: order.chooseGood.goodsTablePagination,
  searchKey: order.chooseGood.searchKey,
  steps: order.skeleton.steps,
  dutySetting: global.settings.dutySetting,
  selectedUser: global.orderUser,
  nextBtnDisabled: order.chooseGood.uiState.nextBtnDisabled,
});
const mapDispathToProps = {
  setCarCollapse,
  queryGoodsByPaging,
  selectingGoods,
  addGoodsToCart,
  deleteGoodsFromCart,
  editingCartGoods,
  queryBySearchKey,
  createDeliveryOrder,
  addSplitOrder,
  deleteSplitOrder,
  goPreviousStep,
  goNextStep,
  initGoods,
  setNextBtnDisable,
  setEditingPrice,
  setEditingPriceStatus,
  setNeedCreateInvoice,
};

const ChooseGoodView = connect(mapStateToProps, mapDispathToProps)(injectIntl(chooseGoodView));
export default ChooseGoodView;
