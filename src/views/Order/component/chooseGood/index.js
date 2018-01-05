import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon, Layout, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { CHINA_CODE, MAX_PAYABLE_PRICE } from 'config/app.config';
import styles from '../../Order.less';
import Cart from './cart';
import Search from './search';
import Goods from './goods';
import { setCarCollapse, queryGoodsByPaging, queryBySearchKey, selectingGoods, addGoodsToCart, deleteGoodsFromCart, editingCartGoods, setItemPrice } from './flow/action.js';
import { createDeliveryOrder, addSplitOrder, deleteSplitOrder, goNextStep, goPreviousStep } from '../skeleton/flow/action';
import { initGoods } from '../splitOrder/flow/action';

const { Sider, Content, Footer } = Layout;

const cx = classNames.bind(styles);

class chooseGoodView extends React.Component {
  componentDidMount() {
    this.props.queryGoodsByPaging();
  }
  submitOrder() {
    const {
      totalDuty, cart, createDeliveryOrder, deleteSplitOrder, addSplitOrder, initGoods, dutySetting, selectedUser
    } = this.props;
    const max = _.isEmpty(dutySetting) ? MAX_PAYABLE_PRICE : Number(dutySetting[0].threshold);
    const { country } = selectedUser;
    if (totalDuty >= max && country === CHINA_CODE) { // 如果超过300,并且是发往中国 就分担。此处是mock，需要更改为global setting中传入的值
      addSplitOrder();
      initGoods(cart);
    } else {
      const postData = cart.map(item => ({
        price: item.price,
        product_id: item.id,
        quantity: item.quantity,
      }));
      createDeliveryOrder([postData]);
      deleteSplitOrder();
    }
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
      setItemPrice,
      goNextStep,
      goPreviousStep,
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
            width={300}
          >
            <Cart
              cartData={cart}
              deleteGoods={deleteGoodsFromCart}
              editingCartGoods={editingCartGoods}
              totalItemQuantity={totalItemQuantity}
              totalPrice={totalPrice}
              totalCost={totalCost}
              totalDuty={totalDuty}
              setItemPrice={setItemPrice}
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
            disabled={!(cart && cart.length > 0)}
            onClick={() => {
                this.submitOrder();
                goNextStep('chooseGoods');
              }}
          >
            { formatMessage({ id: 'global.ui.button.next' }) } <Icon type="arrow-right" />
          </Button>
        </div>

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
  dutySetting: global.dutySetting,
  selectedUser: global.orderUser,
});
const mapDispathToProps = {
  setCarCollapse,
  queryGoodsByPaging,
  selectingGoods,
  addGoodsToCart,
  deleteGoodsFromCart,
  editingCartGoods,
  queryBySearchKey,
  setItemPrice,
  createDeliveryOrder,
  addSplitOrder,
  deleteSplitOrder,
  goNextStep,
  goPreviousStep,
  initGoods,
};

const ChooseGoodView = connect(mapStateToProps, mapDispathToProps)(injectIntl(chooseGoodView));
export default ChooseGoodView;
