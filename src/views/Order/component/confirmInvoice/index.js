import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { goPreviousStep } from '../skeleton/flow/action';
import styles from '../../Order.less';
import { baseUrl } from 'config/env.config';
import Address from './address';
import Invoice from './invoice';
import { resetOrder } from '../skeleton/flow/action';


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
      address,
      freightSettings,
      resetOrder,
    } = this.props;
    const invoicesEl = invoices.map((item) => {
      const deliveryOrder = item.delivery_order;
      const freight = freightSettings.filter(f => (f.id === item.freight_setting_id));
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
          freightSetting={freight[0].name}
          items={deliveryOrder.items}
          totalPrice={item.cny_total_value}
          totalQuantity={totalQuantity}
          orderTime={item.created_at}
          shippingCost={item.shipping_cost}
        />
      );
    });
    return (
      <div className={classNames('block', cx('confirm-invoice-block'))}>
        <div className="block-title">
          <strong> 订单确认 </strong>
        </div>
        <div className="block-content">
          <form name="payFreightForm" action={`${baseUrl}/affiliate/delivery-orders/pay`} method="post">
            <input type="hidden" name="freight_id" value={freightId} />
            <input type="hidden" name="delivery_orders_ids" value={deliveryOrderIds} />
          </form>
          <Address {...address} />
          {invoicesEl}
          <p className={classNames(cx('confirm-invoice-total-shipping-cost'), 'text-primary')}>
            Total Shipping Cost:
            <strong>{ totalCost }</strong>
          </p>
        </div>
        <div className={classNames('block-footer', cx('confirm-invoice-block-footer'))}>
          <Button
            className={cx('order-step-previous-btn')}
            onClick={() => {
              goPreviousStep('confirmOrder');
            }}
          >
            <Icon type="arrow-left" /> previous
          </Button>
          <Button
            className={cx('order-step-next-btn')}
            type="primary"
            onClick={() => {
              resetOrder();
              this.confirmPayFreight();
            }}
          >
            支付 <Icon type="pay-circle-o" />
          </Button>
        </div>
      </div>
    );
  }
}
confirmInvoiceView.defaultProps = {
  deliveryOrderIds: [],
  freightId: 0,
  invoices: {},
};
confirmInvoiceView.propTypes = {
  intl: intlShape.isRequired,
  goPreviousStep: PropTypes.func.isRequired,
  deliveryOrderIds: PropTypes.array,
  freightId: PropTypes.number,
  invoices: PropTypes.array,
};
const mapStateToProps = ({ order, global }) => ({
  freightId: order.chooseLogistic.logisticType,
  deliveryOrderIds: order.skeleton.deliveryOrders,
  invoices: order.confirmInvoice.invoices,
  address: order.confirmInvoice.address,
  freightSettings: global.settings.freightSetting,
});
const mapDispathToProps = {
  goPreviousStep,
  resetOrder,
};

const ConfirmInvoiceView = connect(mapStateToProps, mapDispathToProps)(injectIntl(confirmInvoiceView));
export default ConfirmInvoiceView;
