import React from 'react';
import PropTypes from 'prop-types';

import { InputNumber, Currency } from 'components/ui/index';
import { Icon, Collapse, Button, Divider, Tooltip } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';
import { CREATED, EDITING, SAVED } from './flow/orderStatus';

const { Panel } = Collapse;
const cx = classNames.bind(styles);

const orders = ({
  ordersData, currentOrder, intl, deleteOrderGoods, setOrderGoodsQuantity, deleteOrder, setOrderStatus, symbol, max,
}) => {
  const { formatMessage } = intl;
  const getOperationBtnByStatus = (order) => {
    if (order.status === SAVED) {
      if (order.goods.length > 0) {
        return <Button size="small" onClick={() => { setOrderStatus(order, EDITING, currentOrder); }}>{formatMessage({ id: 'global.ui.button.edit' })}</Button>;
      }
      return <Button size="small" type="primary" onClick={() => { setOrderStatus(order, EDITING, currentOrder); }}>{formatMessage({ id: 'global.ui.button.addGoods' })}</Button>;
    } else if (order.status === EDITING) {
      return <Button size="small" type="primary" onClick={() => { setOrderStatus(order, SAVED, currentOrder); }}>{formatMessage({ id: 'global.ui.button.save' })}</Button>;
    } else if (order.status === CREATED) {
      return <Button size="small" type="primary" onClick={() => { setOrderStatus(order, EDITING, currentOrder); }}>{formatMessage({ id: 'global.ui.button.addGoods' })}</Button>;
    }
  };
  const orderDataEl = (
    <Collapse defaultActiveKey={['1']}>

      {
      Object.keys(ordersData).map((key, index) => {
        const order = ordersData[key];
        const disabled = order.status === SAVED;
        return (
          <Panel header={formatMessage({ id: 'global.properNouns.deliveryOrder' }) +"-"+ (index+1)} key={order.id}>
            <div className={classNames('block', cx('split-order-sub-order-block'))}>
              <div className={classNames('block-title', cx('split-order-sub-order-title'))}>
                { getOperationBtnByStatus(order) }
                <Button size="small" onClick={() => { deleteOrder(order); }}>{formatMessage({ id: 'global.ui.button.delete' })}</Button>
              </div>
              <div className="block-content">
                {order.error && order.error.length > 0 ? (<p className="text-danger"><Icon type="warning" />  {formatMessage({ id: `page.Order.${order.error}` })} </p>) : ''}
                <ul className={classNames(cx('choose-good-cart-list'), cx('split-order-sub-order-goods-list'))}>
                  { order.goods.map(product => (
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
                          <Button className={classNames('icon-btn', 'ordinary', cx('delete-product-btn'))} onClick={() => deleteOrderGoods(product)} ><Icon type="delete" /></Button>
                        </div>
                      </div>

                      <div className={classNames('row', cx('product-row'))}>
                        <div className="col-sm-4"><span className={cx('product-label')}>{formatMessage({ id: 'global.properNouns.goods.quantity' })}:</span></div>
                        <div className="col-sm-8"><InputNumber
                          min={1}
                          disabled={disabled}
                          value={product.quantity}
                          max={product.availableQuantity}
                          onChange={(value) => { setOrderGoodsQuantity(product, value, currentOrder, ordersData); }}
                        />
                        </div>
                      </div>
                      <div className={classNames('row', cx('product-row'))}>
                        <div className="col-sm-4"><span className={cx('product-label')}>{formatMessage({ id: 'global.properNouns.goods.cost' })}：</span></div>
                        <div className="col-sm-8">{product.unitPrice} x {product.quantity} = {product.totalCost}</div>
                      </div>
                      <div className={classNames('row', cx('product-row'))}>
                        <div className="col-sm-4"><span className={cx('product-label')}>{formatMessage({ id: 'global.properNouns.total' })}：</span></div>
                        <div className="col-sm-8">{product.price} x {product.quantity} = {product.totalPrice}</div>
                      </div>
                      <div className={classNames('row', cx('product-row'))}>
                        <div className="col-sm-4"><span className={cx('product-label')}>{formatMessage({ id: 'global.properNouns.goods.duty' })}：</span></div>
                        <div className="col-sm-8">{product.recommendedPrice} x {product.quantity} = {product.totalDuty}</div>
                      </div>
                    </li>
                  ))
                  }
                </ul>
                { order.goods && order.goods.length > 0 ? (
                  <div className={classNames('block-footer', cx('split-order-sub-order-footer'))}>
                    <span>{formatMessage({ id: 'global.properNouns.total' })}{order.totalQuantity}{formatMessage({ id: 'global.properNouns.item' })}</span>
                    <Divider type="vertical" />
                    <span>{formatMessage({ id: 'global.properNouns.goods.totalCost' })}:<Currency value={order.totalCost} /> </span>
                    <br />
                    <span>{formatMessage({ id: 'global.properNouns.goods.totalPrice' })}:<Currency value={order.totalPrice} /></span>
                    <br />
                    <span>{formatMessage({ id: 'global.properNouns.goods.totalDuty' })}:<Currency value={order.totalDuty} /></span>
                  </div>
                ) : ''}

              </div>
            </div>
          </Panel>
        );
      })
    }
    </Collapse>
  );
  const nullOrderDataEl = (
    <div className={cx('null-sub-order')}>
      <p>
        { formatMessage({ id: 'page.Order.nullOrder' }, { symbol, max }) }
        <Icon type="plus" className="text-primary" />
        { formatMessage({ id: 'page.Order.createOrder' }) }
      </p>
      <p className="text-danger"><Icon type="warning" />{ formatMessage({ id: 'page.Order.maxPrice' }, { symbol, max }) }</p>
    </div>
  );
  return (
    <div className={classNames('block', cx('split-order-sub-orders-block'))}>
      <div className={classNames('block-title', cx('split-order-sub-orders-block-title'))}>
        <strong>{formatMessage({ id: 'global.properNouns.deliveryOrder' }) }</strong>
      </div>
      <div className={classNames('block-content', cx('split-order-sub-orders-block-content'))}>
        { Object.keys(ordersData).length > 0 ? orderDataEl : nullOrderDataEl }
      </div>
    </div>);
};

orders.defaultProps = {
  ordersData: [],
  symbol: '',
  max: 0,
};
orders.propTypes = {
  intl: intlShape.isRequired,
  ordersData: PropTypes.object,
  deleteOrderGoods: PropTypes.func.isRequired,
  setOrderGoodsQuantity: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  setOrderStatus: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired,
  symbol: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
const OrdersView = injectIntl(orders);
export default OrdersView;
