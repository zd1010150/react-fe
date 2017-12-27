import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'src/components/ui/index';
import { Icon, Button, Input, Divider } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';

const cx = classNames.bind(styles);

class cart extends React.Component {
  state = {
    priceEditInputStatus: this.initPriceInputStatus(this.props.cartData),
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      priceEditInputStatus: this.initPriceInputStatus(nextProps.cartData),
    });
  }
  initPriceInputStatus(cartData) {
    return cartData.map(item => ({
      disabled: true,
      price: item.recommendedPrice,
    }));
  }
  togglePrice(index, disabled, price) {
    const newPriceEditInputStatus = this.state.priceEditInputStatus.slice();
    newPriceEditInputStatus[index] = Object.assign(
      {},
      newPriceEditInputStatus[index],
      {
        disabled,
        price: price || newPriceEditInputStatus[index].price,
      },
    );
    this.setState({
      priceEditInputStatus: newPriceEditInputStatus,
    });
  }
  render() {
    const {
      cartData,
      intl,
      deleteGoods,
      editingCartGoods,
      totalItemQuantity,
      totalPrice,
      totalCost,
      setItemPrice,
    } = this.props;
    const { formatMessage } = intl;
    const cartDataEl = (
      <ul className={cx('choose-good-cart-list')}>
        {
        cartData.map((product, index) => (
          <li className={classNames(cx('choose-good-cart-product'))} key={product.id}>

            <div className={classNames('row')}>
              <div className="product-img col-sm-4"><img
                src={product.picture}
                className="product-thumbnail"
                alt="product thumbnail"
              />
              </div>
              <div className="product-title col-sm-8">
                <span className={classNames(cx('product-label'), cx('product-label-name'))}>{product.name}</span>
                <Button className={classNames('icon-btn', 'ordinary', cx('delete-product-btn'))} onClick={() => deleteGoods(product)} ><Icon type="delete" /></Button>
              </div>
            </div>
            <div className={classNames('row', cx('product-row'))}>
              <div className={classNames('col-sm-4')}><span className={cx('product-label', cx('product-price'))}>单价:</span></div>
              <div className={classNames('product-title', 'col-sm-8', cx('product-prices'))}>
                <Input
                  className={classNames(cx('product-price-input'), 'input-number')}
                  defaultValue={product.price}
                  disabled={this.state.priceEditInputStatus[index].disabled}
                  onInput={e => this.togglePrice(index, false, e.target.value)}
                />
                {this.state.priceEditInputStatus[index].disabled ?
                  (
                    <Button className={classNames('icon-btn', 'ordinary', cx('edit-price-btn'))} onClick={() => this.togglePrice(index, false)}><Icon type="edit" /></Button>)
                  :
                  (
                    <Button
                      className={classNames('icon-btn', cx('save-price-btn'))}
                      onClick={() => {
                        setItemPrice(product.id, this.state.priceEditInputStatus[index].price);
                      }}
                    >
                      <Icon type="save" />
                    </Button>
                  )
                }
              </div>
            </div>
            <div className={classNames('row', cx('product-row'))}>
              <div className="col-sm-4"><span className={cx('product-label')}>数量:</span></div>
              <div className="col-sm-8"><InputNumber
                min={1}
                value={product.quantity}
                max={product.currentQuantity}
                onChange={(value) => { editingCartGoods(product, value); }}
              />
              </div>
            </div>
            <div className={classNames('row', cx('product-row'))}>
              <div className="col-sm-4"><span className={cx('product-label')}>总成本：</span></div>
              <div className="col-sm-8">{product.unitPrice} x {product.quantity} = {product.totalPrice}</div>
            </div>
            <div className={classNames('row', cx('product-row'))}>
              <div className="col-sm-4"><span className={cx('product-label')}>总售价：</span></div>
              <div className="col-sm-8">{product.price} x {product.quantity} = {product.totalPrice}</div>
            </div>
          </li>
        ))
      }
      </ul>
    );
    const nullCartDataEl = (
      <div className={cx('null-goods-cart')}>
        <Icon type="shopping-cart" />
        <p>发货车空空如也，点击左边商品列表，添加商品</p>
      </div>

    );
    return (
      <div className={classNames('block', cx('choose-goods-cart'))}>
        <div className={classNames('block-title', cx('choose-goods-cart-title'))}>
          <strong>{formatMessage({ id: 'page.Order.selectedGoods' })}</strong>
        </div>
        <div className={classNames('block-content', cx('choose-goods-cart-content'))}>
          { cartData && cartData.length < 1 ? nullCartDataEl : cartDataEl }
        </div>
        <div className={classNames('block-footer', cx('choose-goods-cart-footer'))}>
          <span>总共{totalItemQuantity}件</span>
          <Divider type="vertical" />
          <span>总成本:{totalCost} </span>
          <Divider type="vertical" />
          <span>总售价:{totalPrice} </span>
        </div>
      </div>);
  }
}

cart.defaultProps = {
  cartData: [],
};
cart.propTypes = {
  intl: intlShape.isRequired,
  cartData: PropTypes.array,
  deleteGoods: PropTypes.func.isRequired,
  editingCartGoods: PropTypes.func.isRequired,
  setItemPrice: PropTypes.func.isRequired,
  totalItemQuantity: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
};
const CartView = injectIntl(cart);
export default CartView;
