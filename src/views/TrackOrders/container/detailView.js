/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { Currency } from 'components/ui/index';
import { setPageTitle } from 'store/global/action';
import OrderDetail from '../component/orderDetail';
import Package from '../component/package';
import OrderGoodsItem from '../component/orderGoodsItem';
import { getOrderDetail, getpackages, getUnpackedOrderTotal } from '../flow/reselect';


class trackOrderDetailView extends React.Component {
  componentDidMount() {
    const {
      setPageTitle,
    } = this.props;
    setPageTitle('global.pageTitle.trackOrderDetail');
  }
  render() {
    const {
      trackOrder,
      packages,
      orderDetail,
      intl,
      orderTotal,
    } = this.props;
    const { formatMessage } = intl;
    const buildDetail = () => {
      if (packages && packages.length > 0) {
        return packages.map(p => <Package {...p} key={p.trackingNumber} />);
      }
      const { invoices, items } = trackOrder;
      if (items) {
        return (<OrderGoodsItem orderNumber={trackOrder.order_number} items={items} {...orderTotal} freightSettingId={invoices && invoices.freight_setting_id} />);
      }
      return '';
    };
    return (
      <section className="section section-page section-track-order">
        <div className="section-header">
          <Link to="/trackOrders" className="a-btn"><Icon type="rollback" /> { formatMessage({ id: 'global.ui.button.goBack' })} </Link>
        </div>
        <div className="section-content">
          <OrderDetail {...orderDetail} />
          { buildDetail() }
        </div>
        <div className="section-footer">
          <p className={classNames('invoice-total-shipping-cost', 'text-primary')}>
            { formatMessage({ id: 'global.properNouns.goods.shippingCost' })}:
            <strong><Currency value={trackOrder.shipping_cost} /></strong>
          </p>
        </div>
      </section>
    );
  }
}
trackOrderDetailView.defaultProps = {
  orderDetail: {},
  trackOrder: {},
  packages: [],
  orderTotal: {},
};
trackOrderDetailView.propTypes = {
  intl: intlShape.isRequired,
  trackOrder: PropTypes.object,
  orderDetail: PropTypes.object,
  packages: PropTypes.array,
  orderTotal: PropTypes.object,
};
const mapStateToProps = ({ trackOrders }) => ({
  trackOrder: trackOrders.trackOrder,
  orderDetail: getOrderDetail(trackOrders),
  packages: getpackages(trackOrders),
  orderTotal: getUnpackedOrderTotal(trackOrders),
});
const mapDispatchToProp = {
  setPageTitle,
};

const TrackOrderDetailView = connect(mapStateToProps, mapDispatchToProp)(injectIntl(trackOrderDetailView));
export default TrackOrderDetailView;

