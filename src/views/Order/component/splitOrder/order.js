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
  return (
    <div className="block">
      <div className="block-title">
        <strong>{ formatMessage({ id: 'page.Order.selectedGoods' }) }</strong>
      </div>
      <div className="block-content">
        <Collapse defaultActiveKey={['1']}>
          {
            ordersData.map(order => (
              <Panel header={`order-${order.id}`} key={order.id}>
                <div className="block">
                  <div className="block-title">
                    <Button onClick={() => { setOrderStatus(order, EDITING, currentOrder) }}>
                      { order.goods.length > 0 ? formatMessage({ id: 'global.ui.button.edit' }) : formatMessage({ id: 'global.ui.button.addGoods' }) }
                    </Button>
                    <Button onClick={() => { deleteOrder(order); }}>{formatMessage({ id: 'global.ui.button.delete' })}</Button>
                  </div>
                  <div className="block-content" />
                </div>
              </Panel>
            ))
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
  ordersData: PropTypes.array,
  deleteOrderGoods: PropTypes.func.isRequired,
  setOrderGoodsQuantity: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  setOrderStatus: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired,
};
const OrdersView = injectIntl(orders);
export default OrdersView;
