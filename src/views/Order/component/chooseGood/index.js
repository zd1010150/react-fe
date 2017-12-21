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
import { setCarCollapse, queryGoodsByPaging, queryBySearchKey, selectingGoods, addGoodsToCart, deleteGoodsFromCart, editingCartGoods } from './flow/action.js';
import { setCurrentStep } from '../skeleton/flow/action';

const { Sider, Content } = Layout;

const cx = classNames.bind(styles);

class chooseGoodView extends React.Component {
  componentDidMount() {
    this.props.queryGoodsByPaging();
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
      goodsTablePagination,
      setCurrentStep,
    } = this.props;
    return (
      <div className={cx('section')}>
        <Button
          style={{ marginLeft: 8 }}
          onClick={() => {
            setCurrentStep(0);
          }}
        >
          previous
        </Button>
        <Button
          style={{ marginLeft: 8 }}
          disabled={!(cart && cart.length > 0)}
          onClick={() => {
            setCurrentStep(2);
          }}
        >
          next
        </Button>
        <Layout>

          <Content>
            <Search queryGoods={queryBySearchKey} />
            <Goods goodsData={goods} addGoodsToCart={addGoodsToCart} selectingGoods={selectingGoods} queryGoodsByPaging={queryGoodsByPaging} goodsTablePagination={goodsTablePagination} />
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
          >
            <Cart cartData={cart} deleteGoods={deleteGoodsFromCart} editingCartGoods={editingCartGoods} totalItemQuantity={totalItemQuantity} totalPrice={totalPrice} />
          </Sider>
        </Layout>
      </div>);
  }
}


chooseGoodView.propTypes = {
  intl: intlShape.isRequired,
  queryGoodsByPaging: PropTypes.func.isRequired,
};
const mapStateToProps = ({ order }) => ({
  ...order.chooseGood,
  goods: order.chooseGood.goods,
  cart: order.chooseGood.cart.goods,
  totalItemQuantity: order.chooseGood.cart.totalItemQuantity,
  totalPrice: order.chooseGood.cart.totalPrice,
  cartCollapse: order.chooseGood.cartCollapse,
  goodsTablePagination: order.chooseGood.goodsTablePagination,
  searchKey: order.chooseGood.searchKey,
});
const mapDispathToProps = {
  setCarCollapse,
  queryGoodsByPaging,
  selectingGoods,
  addGoodsToCart,
  deleteGoodsFromCart,
  editingCartGoods,
  queryBySearchKey,
  setCurrentStep,
};

const ChooseGoodView = connect(mapStateToProps, mapDispathToProps)(injectIntl(chooseGoodView));
export default ChooseGoodView;
