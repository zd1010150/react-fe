import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import classNames from 'classnames/bind';
import { intlShape, injectIntl } from 'react-intl';
import { goPreviousStep } from '../skeleton/flow/action';
import styles from '../../Order.less';
import { baseUrl } from 'config/env.config';

const cx = classNames.bind(styles);

class confirmInvoiceView extends React.Component {
  confirmGetInvoice() {
    window.forms.payFreightForm.submit();
  }
  render() {
    const {
      goPreviousStep, deliveryOrderIds, freightId, invoices,
    } = this.props;
    return (
      <div className={classNames('block', cx('choose-logistic-block'))}>
        <div className="block-title">
          <strong> 订单确认 </strong>
        </div>
        <div className="block-content">
          <form name="payFreightForm" action={`${baseUrl}/affiliate/delivery-orders/pay`} method="post">
            <input type="hidden" name="freight_id" value={freightId} />
            <input type="hidden" name="delivery_orders_ids" value={deliveryOrderIds} />
          </form>
          <p>{invoices}</p>
        </div>
        <div className="block-footer">
          <Button
            className={cx('order-step-previous-btn')}
            onClick={() => {
              goPreviousStep('confirmInvoice');
            }}
          >
            <Icon type="arrow-left" /> previous
          </Button>
          <Button
            className={cx('order-step-next-btn')}
            type="primary"
            onClick={() => {
              this.confirmGetInvoice();
            }}
          >
            confirm
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
  invoices: PropTypes.object,
};
const mapStateToProps = ({ order, confirmInvoice }) => ({
  freightId: order.chooseLogistic.logisticType,
  deliveryOrderIds: order.skeleton.deliveryOrders,
  invoices: confirmInvoice,
});
const mapDispathToProps = {
  goPreviousStep,
};

const ConfirmInvoiceView = connect(mapStateToProps, mapDispathToProps)(injectIntl(confirmInvoiceView));
export default ConfirmInvoiceView;
