import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Currency } from 'components/ui/index';
import { Icon, Button, Input, Divider, Tooltip } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { positiveFloat } from 'utils/regex';
import styles from '../../Order.less';

const cx = classNames.bind(styles);

class cart extends React.Component {
  componentWillUnmount(){

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
      totalDuty,
      setNextBtnDisable,
      setEditingPrice,
      setEditingPriceStatus,

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
                <div className={classNames(cx('product-label-name-wrapper'))}>
                  <span className={classNames(cx('product-label'), cx('product-label-name'), cx('goods-product-name'))}>
                    <Tooltip title={product.name}>{product.name}</Tooltip>
                  </span>
                  <small className={classNames(cx('product-label'), cx('product-label-name'))}>
                    <Tooltip title={product.sku}>{product.sku}</Tooltip>
                  </small>
                </div>
                <Button className={classNames('icon-btn', 'ordinary', cx('delete-product-btn'))} onClick={() => deleteGoods(cartData, product)} ><Icon type="delete" /></Button>
              </div>
            </div>
            <div className={classNames('row', cx('product-row'))}>
              <div className={classNames('col-sm-4')}><span className={cx('product-label', cx('product-price'))}>{ formatMessage({ id: 'global.properNouns.goods.price' })}:</span></div>
              <div className={classNames('product-title', 'col-sm-8', cx('product-prices'))}>
                <Input
                  className={classNames(cx('product-price-input'), 'input-number', '')}
                  value={product.editingPrice}
                  disabled={!product.isEditingPrice}
                  onInput={
                    (e) => {
                      setEditingPrice(product.id, e.target.value);
                     }
                  }
                />
                { (!product.isEditingPrice) ?
                  (
                    <Button
                      className={classNames('icon-btn', 'ordinary', cx('edit-price-btn'))}
                      onClick={() => {
                              setEditingPriceStatus(product.id, true);
                              setNextBtnDisable(true);
                            }}
                    >
                      <Icon type="edit" />
                    </Button>)
                  :
                  (
                    <Button
                      className={classNames('icon-btn', cx('save-price-btn'))}
                      onClick={() => {
                        setEditingPriceStatus(product.id, false);
                        setNextBtnDisable(false);
                        }
                      }
                    >
                      <Icon type="save" />
                    </Button>
                  )
                }
              </div>
            </div>
            <div className={classNames('row', cx('product-row'))}>
              <div className="col-sm-4"><span className={cx('product-label')}>{ formatMessage({ id: 'global.properNouns.goods.quantity' })}:</span></div>
              <div className="col-sm-8"><InputNumber
                min={1}
                value={product.quantity}
                max={product.currentQuantity}
                onChange={(value) => { editingCartGoods(product, value); }}
              />
              </div>
            </div>
            <div className={classNames('row', cx('product-row'))}>
              <div className="col-sm-4"><span className={cx('product-label')}>{ formatMessage({ id: 'global.properNouns.goods.subTotal' })}：</span></div>
              <div className="col-sm-8"><Currency value={product.price} /> x {product.quantity} = <Currency value={product.totalPrice} /></div>
            </div>
            <div className={classNames('row', cx('product-row'))}>
              <div className="col-sm-4"><span className={cx('product-label')}>{ formatMessage({ id: 'global.properNouns.goods.cost' })}：</span></div>
              <div className="col-sm-8"><Currency value={product.unitPrice} /> x {product.quantity} = <Currency value={product.totalCost} /></div>
            </div>
            <div className={classNames('row', cx('product-row'))}>
              <div className="col-sm-4"><span className={cx('product-label')}>{formatMessage({ id: 'global.properNouns.goods.duty' })}：</span></div>
              <div className="col-sm-8"><Currency value={product.recommendedPrice} /> x {product.quantity} = <Currency value={product.totalDuty} /></div>
            </div>

          </li>
        ))
      }
      </ul>
    );
    const nullCartDataEl = (
      <div className={cx('null-goods-cart')}>
        <p><Icon type="shopping-cart" />{ formatMessage({ id: 'page.Order.nullCart' }) }</p>
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
          <span>{ formatMessage({ id: 'global.properNouns.total' })} {totalItemQuantity} { formatMessage({ id: 'global.properNouns.item' })}</span>
          <Divider type="vertical" />
          <span>{ formatMessage({ id: 'global.properNouns.goods.totalPrice' })}: <Currency value={totalPrice} /></span>
          <br />
          <span>{ formatMessage({ id: 'global.properNouns.goods.totalCost' })}: <Currency value={totalCost} />  </span>
          <br />
          <span>{ formatMessage({ id: 'global.properNouns.goods.totalDuty' })}: <Currency value={totalDuty} /></span>
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
  setNextBtnDisable: PropTypes.func.isRequired,
  editingCartGoods: PropTypes.func.isRequired,
  totalItemQuantity: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
  totalDuty: PropTypes.number.isRequired,
  setEditingPriceStatus: PropTypes.func.isRequired,
  setEditingPrice: PropTypes.func.isRequired,
};
const CartView = injectIntl(cart);
export default CartView;
