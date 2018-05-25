import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import { Currency } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { goPreviousStep } from '../skeleton/flow/action';
import styles from '../../Order.less';
import { baseUrl } from 'config/env.config';
import Address from './address';
import Invoice from './invoice';
import { getReceiver } from './flow/reselect';
import { pay } from './flow/action';


const cx = classNames.bind(styles);

class confirmInvoiceView extends React.Component {
  pay(total) {
    const { freightId, deliveryOrderIds, pay } = this.props;
    const formData = {
      freight_id: freightId,
      shipping_cost: total,
      delivery_orders_ids: deliveryOrderIds,
    };

    pay(formData);
  }
  render() {
    const {
      goPreviousStep,
      invoices,
      receiver,
      intl,
      freightId,
    } = this.props;
    const { formatMessage } = intl;
    let totalShippingCost = 0;
    let totalAUDShippingCost = 0;
    const invoicesEl = (() => {
      let totalQuantity = 0;
      let totalInvoiceShippingCost = 0;
      let totalGoodsCost = 0;
      const goodsEl = invoices.map((item) => {
        const deliveryOrder = item.delivery_order;
        deliveryOrder.items.forEach(i => {
          totalQuantity += Number(i.quantity);
        });
        totalInvoiceShippingCost = Number(item.actual_shipping_cost); // 屏蔽了分单功能，并且没有把运费平摊到每个订单里面，所以这个地方的运费就是总运费
        totalShippingCost += Number(item.shipping_cost);
        totalAUDShippingCost += Number(item.aud_shipping_cost);
        totalGoodsCost += Number(item.amount);
        return (
          <Invoice
            key={deliveryOrder.order_number}
            items={deliveryOrder.items}
          />
        );
      });
      return (
        <div className="section pl-xxlg pb-xxlg pr-xxlg bg-white">
          <div className="section-header section-header-md">
            <div className="section-header-left title">
              {formatMessage({ id: 'page.Order.myGoods' })}
            </div>
            <div className={classNames('section-header-right', cx('invoice-sub-title'))} >
              {formatMessage({ id: 'page.Order.totalQuantity' })}: {totalQuantity}
            </div>
          </div>
          <div className={classNames('section-content section-content-border', cx('invoice-table'))}>
            { goodsEl }
          </div>
          <div className="section-footer pt-xlg">
            <ul className={classNames('invoice-ul', cx('invoice-total-ul'))}>
              <li >
                <div className="trade-info-dt">
                  { formatMessage({ id: 'page.Order.goodsCost' })}:
                </div>
                <div className="trade-info-dd">
                  <Currency value={totalGoodsCost} />
                </div>
              </li>
              <li >
                <div className="trade-info-dt">
                  { formatMessage({ id: 'page.Order.invoiceShippingCost' })}
                  <Tooltip title={formatMessage({ id: 'page.Order.invoiceFreightFeeTip' })} placement="bottom">
                    <Icon type="question-circle-o" className="pl-sm" />
                  </Tooltip>:
                </div>
                <div className="trade-info-dd">
                  <Currency value={totalInvoiceShippingCost} />
                </div>
              </li>
              <li>
                <div className="trade-info-dt">
                  { formatMessage({ id: 'global.properNouns.total' })}:
                </div>
                <div className="trade-info-dd">
                  <Currency value={totalGoodsCost + totalInvoiceShippingCost} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    })();

    return (
      <div className={classNames('block', 'invoice-block', 'section-confirm-invoice')}>
        <div className="block-content">
          <Address {...receiver} freightSetting={freightId} />
          {invoicesEl}
          <p className={classNames('invoice-total-shipping-cost', 'text-primary', 'pr-xxlg pt-xlg')}>
            {formatMessage({ id: 'page.Order.shouldPayLogisiticFee' })}
            :
            <strong><Currency value={totalShippingCost} /></strong>
          </p>
        </div>
        <div className={classNames('block-footer', 'invoice-block-footer pr-xxlg')}>
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
              this.pay(totalAUDShippingCost);
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
  freightId: order.chooseLogistic.logistic.logisticType,
  deliveryOrderIds: order.skeleton.deliveryOrders,
  invoices: order.confirmInvoice.invoices,
  receiver: getReceiver(order.confirmInvoice.invoices),
});
const mapDispathToProps = {
  goPreviousStep,
  pay,
};

const ConfirmInvoiceView = connect(mapStateToProps, mapDispathToProps)(injectIntl(confirmInvoiceView));
export default ConfirmInvoiceView;
