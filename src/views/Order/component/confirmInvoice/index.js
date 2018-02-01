import React from 'react';
import PropTypes from 'prop-types';
import { getLocationOfAbsoluteUrl } from 'utils/url';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import { Currency } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { goPreviousStep } from '../skeleton/flow/action';
import styles from '../../Order.less';
import { baseUrl } from 'config/env.config';
import Address from './address';
import Invoice from './invoice';
import { getReceiver } from './flow/reselect';
import { getQuoteId } from './flow/action';


const cx = classNames.bind(styles);

class confirmInvoiceView extends React.Component {
  confirmPayFreight() {
    document.forms.payFreightForm.submit();
  }
  render() {
    let totalShippingCost = 0;
    let totalAUDShippingCost = 0;
    const {
      goPreviousStep,
      deliveryOrderIds,
      magentoQuoteId,
      freightId,
      invoices,
      receiver,
      getQuoteId,
      magentoShippingCost,
      location,
      intl,
    } = this.props;
    const { formatMessage } = intl;


    const successUrl = location;
    const invoicesEl = invoices.map((item) => {
      const deliveryOrder = item.delivery_order;
      const totalQuantity = deliveryOrder.items.reduce((sum, i) => {
        sum += i.quantity;
        return sum;
      }, 0);
      totalShippingCost += Number(item.shipping_cost);
      totalAUDShippingCost += Number(item.aud_shipping_cost);
      return (
        <Invoice
          key={deliveryOrder.order_number}
          orderNumber={deliveryOrder.order_number}
          trackingNumber={deliveryOrder.tracking_number}
          freightSetting={item.freight_setting_id}
          items={deliveryOrder.items}
          totalPrice={item.amount}
          totalQuantity={totalQuantity}
          orderTime={deliveryOrder.created_at}
          shippingCost={item.shipping_cost}
        />
      );
    });

    return (
      <div className={classNames('block', 'invoice-block', 'section-confirm-invoice')}>
        <div className="block-content">
          <form name="payFreightForm" action={`${baseUrl}/affiliate/delivery-orders/pay`} method="post">
            <input type="hidden" name="quote_id" value={magentoQuoteId} />
            <input type="hidden" name="freight_id" value={freightId} />
            {
              deliveryOrderIds.map((id, index) => <input type="hidden" key={id} name={`delivery_orders_ids[${index}]`} value={id} />)
            }
            <input type="hidden" name="shipping_cost" value={magentoShippingCost} />
            <input type="hidden" name="success_url" value={getLocationOfAbsoluteUrl('/resultNotification?view=successPay')} />
            <input type="hidden" name="error_url" value={getLocationOfAbsoluteUrl('/resultNotification?view=errorPay')} />
          </form>
          <Address {...receiver} />
          {invoicesEl}
          <p className={classNames('invoice-total-shipping-cost', 'text-primary')}>
            {formatMessage({ id: 'global.properNouns.goods.shippingCost' })}:
            <strong><Currency value={totalShippingCost} /></strong>
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
              getQuoteId(totalAUDShippingCost, this.confirmPayFreight);
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
  getQuoteId: PropTypes.func.isRequired,
  deliveryOrderIds: PropTypes.array,
  freightId: PropTypes.number,
  invoices: PropTypes.array,
  receiver: PropTypes.object,
  location: PropTypes.object,
};
const mapStateToProps = ({ order }) => ({
  magentoQuoteId: order.confirmInvoice.magentoQuoteId,
  freightId: order.chooseLogistic.logistic.logisticType,
  deliveryOrderIds: order.skeleton.deliveryOrders,
  invoices: order.confirmInvoice.invoices,
  receiver: getReceiver(order.confirmInvoice.invoices),
  magentoShippingCost: order.confirmInvoice.magentoShippingCost,
});
const mapDispathToProps = {
  goPreviousStep,
  getQuoteId,
};

const ConfirmInvoiceView = withRouter(connect(mapStateToProps, mapDispathToProps)(injectIntl(confirmInvoiceView)));
export default ConfirmInvoiceView;
