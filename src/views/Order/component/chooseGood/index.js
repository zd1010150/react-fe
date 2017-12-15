import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Layout } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';
import Cart from './cart';
import Search from './search';
import Goods from './goods';
import { setCarCollapse, queryGoods, selectingGoods, addGoodsToCart, deleteGoodsFromCart, editingCartGoods } from './flow/action.js';

const { Sider, Content } = Layout;

const cx = classNames.bind(styles);

const chooseGoodView = ({ setCarCollapse, queryGoods, selectingGoods, addGoodsToCart, deleteGoodsFromCart, editingCartGoods, goods, cart, cartCollapse }) => (
  <div className={cx('section')}>
    <Layout>
      <Content>
        <Search queryGoods={queryGoods} />
        <Goods goodsData={goods} addGoodsToCart={addGoodsToCart} selectingGoods={selectingGoods} />
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
        <Cart cartData={cart} deleteGoods={deleteGoodsFromCart} editingCartGoods={editingCartGoods} />
      </Sider>
    </Layout>
  </div>);


chooseGoodView.propTypes = {
  intl: intlShape.isRequired,
};
const mapStateToProps = ({ order }) => ({
  ...order.chooseGood,
});
const mapDispathToProps = {
  setCarCollapse,
  queryGoods,
  selectingGoods,
  addGoodsToCart,
  deleteGoodsFromCart,
  editingCartGoods,
};

const ChooseGoodView = connect(mapStateToProps, mapDispathToProps)(injectIntl(chooseGoodView));
export default ChooseGoodView;
