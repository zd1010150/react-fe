import React from 'react';
import PropTypes from 'prop-types';

import { InputNumber } from 'src/components/ui/index';
import { Icon, Collapse, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../../Order.less';
import { CREATED, EDITING, SAVED, DELETED } from './flow/orderStatus';

const { Panel } = Collapse;
const cx = classNames.bind(styles);

const orders = ({
  ordersData, currentOrder, intl, deleteOrderGoods, setOrderGoodsQuantity, deleteOrder, setOrderStatus,
}) => {
  const { formatMessage } = intl;
  const getOperationBtnByStatus = (order) => {
    if (order.status === SAVED) {
      if (order.goods.length > 0) {
        return <Button onClick={() => { setOrderStatus(order, EDITING, currentOrder);  }}>{formatMessage({ id: 'global.ui.button.edit' })}</Button>;
      }
      return <Button onClick={() => { setOrderStatus(order, EDITING, currentOrder);  }}>{formatMessage({ id: 'global.ui.button.addGoods' })}</Button>;
    } else if (order.status === EDITING) {
      return <Button onClick={() => { setOrderStatus(order, SAVED, currentOrder);  }}>{formatMessage({ id: 'global.ui.button.save' })}</Button>;
    } else if (order.status === CREATED) {
      return <Button onClick={() => { setOrderStatus(order, EDITING, currentOrder);  }}>{formatMessage({ id: 'global.ui.button.addGoods' })}</Button>;
    }
  };

  return (
    <div className="block">
      <div className="block-title">
        <strong>{ formatMessage({ id: 'page.Order.selectedGoods' }) }</strong>

      </div>
      <div className="block-content">
        <Collapse defaultActiveKey={['1']}>
          {
            Object.keys(ordersData).map((key) => {
              const order = ordersData[key];
              const disabled = order.status === SAVED ? true : false;
              return (
                <Panel header={`order-${order.id}`} key={order.id}>
                  <div className="block">
                    <div className="block-title">
                      <span className="text-error"> {order.error} </span>
                      { getOperationBtnByStatus(order) }
                      <Button onClick={() => { deleteOrder(order); }}>{formatMessage({ id: 'global.ui.button.delete' })}</Button>
                    </div>
                    <div className="block-content">
                      <ul>
                        { order.goods.map(product => (
                          <li className="product" key={product.id}>
                            <Button disabled={disabled} onClick={() => deleteOrderGoods(product)}>
                              <Icon type="close-circle-o" />
                            </Button>
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
                              <div className="product-title col-sm-9"> <InputNumber
                                min={1}
                                disabled={disabled}
                                value={product.quantity}
                                max={product.availableQuantity}
                                onChange={(value) => {
                                      setOrderGoodsQuantity(product, value, currentOrder, ordersData);
                                    }}
                              />
                              </div>
                            </div>
                            <div className="row">
                              <div className="product-img col-sm-3">Total</div>
                              <div className="product-title col-sm-9"> 总成本价：{product.totalCost}</div>
                              <div className="product-title col-sm-9"> 总价：{product.totalPrice}</div>
                            </div>
                          </li>
                              ))
                          }
                      </ul>
                    </div>
                  </div>
                </Panel>
              );
            })
          }
        </Collapse>
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
