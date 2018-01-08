import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import classNames from 'classnames/bind';
import { Currency } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { goPreviousStep } from '../skeleton/flow/action';
import styles from '../../Order.less';
import { baseUrl } from 'config/env.config';
import Address from './address';
import Invoice from './invoice';
import { resetOrder } from '../skeleton/flow/action';
import { getReceiver } from './flow/reselect';

const cx = classNames.bind(styles);

class confirmInvoiceView extends React.Component {
  confirmPayFreight() {
    document.forms.payFreightForm.submit();
  }
  render() {
    let totalCost = 0;
    const {
      goPreviousStep,
      deliveryOrderIds,
      freightId,
      invoices,
      receiver,
      resetOrder,
      intl,
    } = this.props;
    const { formatMessage } = intl;
    const invoicesEl = invoices.map((item) => {
      const deliveryOrder = item.delivery_order;
      const totalQuantity = deliveryOrder.items.reduce((sum, i) => {
        sum += i.quantity;
        return sum;
      }, 0);
      totalCost += item.shipping_cost;
      return (
        <Invoice
          key={deliveryOrder.order_number}
          orderNumber={deliveryOrder.order_number}
          trackingNumber={deliveryOrder.tracking_number}
          freightSetting={item.freight_setting_id}
          items={deliveryOrder.items}
          totalPrice={item.amount}
          totalQuantity={totalQuantity}
          orderTime={item.created_at}
          shippingCost={item.shipping_cost}
        />
      );
    });
    return (
      <div className={classNames('block', 'invoice-block', 'section-confirm-invoice')}>
        <div className="block-title">
          <strong> {formatMessage({ id: 'page.Order.confirmOrder' })} </strong>
        </div>
        <div className="block-content">
          <form name="payFreightForm" action={`${baseUrl}/affiliate/delivery-orders/pay`} method="post">
            <input type="hidden" name="freight_id" value={freightId} />
            <input type="hidden" name="delivery_orders_ids" value={deliveryOrderIds} />
          </form>
          <Address {...receiver} />
          {invoicesEl}
          <p className={classNames('invoice-total-shipping-cost', 'text-primary')}>
            {formatMessage({ id: 'global.properNouns.goods.shippingCost' })}:
            <strong><Currency value={totalCost} /></strong>
          </p>
        </div>
        <div className={classNames('block-footer', 'invoice-block-footer')}>
          <Button
            className={cx('order-step-previous-btn')}
            onClick={() => {
              goPreviousStep('confirmOrder');
            }}
          >
            <Icon type="arrow-left" /> { formatMessage({ id: 'global.ui.button.previous' }) }
          </Button>
          <Button
            className={cx('order-step-next-btn')}
            type="primary"
            onClick={() => {
              resetOrder();
              this.confirmPayFreight();
            }}
          >
            { formatMessage({ id: 'global.ui.button.pay' }) } <Icon type="pay-circle-o" />
          </Button>
        </div>
      </div>
    );
  }
}
confirmInvoiceView.defaultProps = {
  deliveryOrderIds: [],
  freightId: 0,
  invoices: [],
  receiver: {},
};
confirmInvoiceView.propTypes = {
  intl: intlShape.isRequired,
  goPreviousStep: PropTypes.func.isRequired,
  deliveryOrderIds: PropTypes.array,
  freightId: PropTypes.number,
  invoices: PropTypes.array,
  receiver: PropTypes.object,
};
const mapStateToProps = ({ order }) => ({
  freightId: order.chooseLogistic.logisticType,
  deliveryOrderIds: order.skeleton.deliveryOrders,
  invoices: order.confirmInvoice.invoices,
  address: order.confirmInvoice.address,
  receiver: getReceiver(order.confirmInvoice.invoices),
});
const mapDispathToProps = {
  goPreviousStep,
  resetOrder,
};

const ConfirmInvoiceView = connect(mapStateToProps, mapDispathToProps)(injectIntl(confirmInvoiceView));
export default ConfirmInvoiceView;
