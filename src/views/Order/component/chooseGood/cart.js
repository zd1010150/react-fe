import React from 'react';
import PropTypes from 'prop-types';
import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';
import { Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';

const cx = classNames.bind(styles);

const cart = ({
  cartData, intl, deleteGoods, editingCartGoods,
}) => {
  const { formatMessage } = intl;
  return (
    <div className="block">
      <div className="block-title">
        <strong>{ formatMessage({ id: 'page.Order.selectedGoods' }) }</strong>
      </div>
      <div className="block-content">
        <ul>
          {
            cartData.map(product => (
              <li className="product" key={product.id}>
                <Icon type="close-circle-o" onClick={() => deleteGoods(product)} />
                <div className="row">
                  <div className="product-img col-sm-3"><img src={product.picture} className="product-thumbnail" alt="product thumbnail" /></div>
                  <div className="product-title col-sm-9"> {product.name}</div>
                </div>
                <div className="row">
                  <div className="product-img col-sm-3">Price</div>
                  <div className="product-title col-sm-9"> {product.unitPrice}</div>
                </div>
                <div className="row">
                  <div className="product-img col-sm-3">Quantity</div>
                  <div className="product-title col-sm-9"> <InputNumber min={1} value={product.quantity} max={product.availableQuantity} onChange={(value) => { console.log('cart change'); editingCartGoods(product, value); }} /></div>
                </div>
                <div className="row">
                  <div className="product-img col-sm-3">Total</div>
                  <div className="product-title col-sm-9"> {product.totalPrice}</div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>);
};

cart.defaultProps = {
  cartData: [],
};
cart.propTypes = {
  intl: intlShape.isRequired,
  cartData: PropTypes.array,
  deleteGoods: PropTypes.func.isRequired,
  editingCartGoods: PropTypes.func.isRequired,
};
const CartView = injectIntl(cart);
export default CartView;
