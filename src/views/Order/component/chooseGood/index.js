import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Layout, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';
import Cart from './cart';
import Search from './search';
import Goods from './goods';
import { setCarCollapse, queryGoodsByPaging, queryBySearchKey, selectingGoods, addGoodsToCart, deleteGoodsFromCart, editingCartGoods, setItemPrice } from './flow/action.js';
import { createDeliveryOrder, addSteps, goNextStep, goPreviousStep } from '../skeleton/flow/action';
import { initGoods } from '../splitOrder/flow/action';

const { Sider, Content, Footer } = Layout;

const cx = classNames.bind(styles);

class chooseGoodView extends React.Component {
  componentDidMount() {
    this.props.queryGoodsByPaging();
  }
  submitOrder() {
    const {
      totalCost, cart, createDeliveryOrder, addSteps, initGoods,
    } = this.props;
    if (totalCost >= 300) { // 如果超过300 就分担。此处是mock，需要更改为global setting中传入的值
      addSteps(2, 'splitOrder');
      initGoods(cart);
    } else {
      const postData = cart.map(item => ({
        price: item.price,
        product_id: item.id,
        quantity: item.quantity,
      }));
      createDeliveryOrder([postData]);
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
      goodsTablePagination,
      steps,
      setItemPrice,
      goNextStep,
      goPreviousStep,
    } = this.props;
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
          <Icon
            className="trigger"
            type={cartCollapse ? 'menu-unfold' : 'menu-fold'}
            onClick={() => { setCarCollapse(!cartCollapse); }}
          />
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
            <Icon type="arrow-left" /> previous
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
              next <Icon type="arrow-right" />
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
const mapStateToProps = ({ order }) => ({
  goods: order.chooseGood.goods,
  cart: order.chooseGood.cart.goods,
  totalCost: order.chooseGood.cart.totalCost,
  totalItemQuantity: order.chooseGood.cart.totalItemQuantity,
  totalPrice: order.chooseGood.cart.totalPrice,
  cartCollapse: order.chooseGood.cartCollapse,
  goodsTablePagination: order.chooseGood.goodsTablePagination,
  searchKey: order.chooseGood.searchKey,
  steps: order.skeleton.steps,
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
  addSteps,
  goNextStep,
  goPreviousStep,
  initGoods,
};

const ChooseGoodView = connect(mapStateToProps, mapDispathToProps)(injectIntl(chooseGoodView));
export default ChooseGoodView;
