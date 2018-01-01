import React from 'react';
import PropTypes from 'prop-types';

import { InputNumber } from 'components/ui/index';
import { Icon, Collapse, Button, Divider } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';
import { CREATED, EDITING, SAVED } from './flow/orderStatus';

const { Panel } = Collapse;
const cx = classNames.bind(styles);

const orders = ({
  ordersData, currentOrder, intl, deleteOrderGoods, setOrderGoodsQuantity, deleteOrder, setOrderStatus,
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
      Object.keys(ordersData).map((key) => {
        const order = ordersData[key];
        const disabled = order.status === SAVED;
        return (
          <Panel header={`order-${order.id}`} key={order.id}>
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
                          <span className={classNames(cx('product-label'), cx('product-label-name'))}>{product.name}</span>
                          <Button className={classNames('icon-btn', 'ordinary', cx('delete-product-btn'))} onClick={() => deleteOrderGoods(product)} ><Icon type="delete" /></Button>
                        </div>
                      </div>

                      <div className={classNames('row', cx('product-row'))}>
                        <div className="col-sm-4"><span className={cx('product-label')}>数量:</span></div>
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
                        <div className="col-sm-4"><span className={cx('product-label')}>总成本：</span></div>
                        <div className="col-sm-8">{product.unitPrice} x {product.quantity} = {product.totalCost}</div>
                      </div>
                      <div className={classNames('row', cx('product-row'))}>
                        <div className="col-sm-4"><span className={cx('product-label')}>总售价：</span></div>
                        <div className="col-sm-8">{product.price} x {product.quantity} = {product.totalPrice}</div>
                      </div>
                    </li>
                  ))
                  }
                </ul>
                { order.goods && order.goods.length > 0 ? (
                  <div className={classNames('block-footer', cx('split-order-sub-order-footer'))}>
                    <span>总共{order.totalQuantity}件</span>
                    <Divider type="vertical" />
                    <span>总成本:{order.totalCost} </span>
                    <Divider type="vertical" />
                    <span>总售价:{order.totalPrice} </span>
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
      <p>亲，你发货的商品价值超过了300刀，需要对物品进行拆分发货，点击<Icon type="plus" />创建发货单，</p>
      <p className="text-danger"><Icon type="warning" />注意:每个发货单的商品价值不能超过300刀</p>
    </div>
  );
  return (
    <div className={classNames('block', cx('split-order-sub-orders-block'))}>
      <div className={classNames('block-title', cx('split-order-sub-orders-block-title'))}>
        <strong>子订单</strong>
      </div>
      <div className={classNames('block-content', cx('split-order-sub-orders-block-content'))}>
        { Object.keys(ordersData).length > 0 ? orderDataEl : nullOrderDataEl }
      </div>
    </div>);
};

orders.defaultProps = {
  ordersData: [],
};
orders.propTypes = {
  intl: intlShape.isRequired,
  ordersData: PropTypes.object,
  deleteOrderGoods: PropTypes.func.isRequired,
  setOrderGoodsQuantity: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  setOrderStatus: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired,
};
const OrdersView = injectIntl(orders);
export default OrdersView;
