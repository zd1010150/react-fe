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
import { getOrderDetail, getpackages } from '../flow/reselect';


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
    } = this.props;
    const { formatMessage } = intl;
    return (
      <section className="section section-page section-track-order">
        <div className="section-header">
          <Link to="/trackOrders" className="a-btn"><Icon type="rollback" /> 返回 </Link>
        </div>
        <div className="section-content">
          <OrderDetail {...orderDetail} />
          {
            packages.map(p => <Package {...p} key={p.trackingNumber} />)
          }
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
};
trackOrderDetailView.propTypes = {
  intl: intlShape.isRequired,
  trackOrder: PropTypes.object,
  orderDetail: PropTypes.object,
  packages: PropTypes.array,
};
const mapStateToProps = ({ trackOrders }) => ({
  trackOrder: trackOrders.trackOrder,
  orderDetail: getOrderDetail(trackOrders),
  packages: getpackages(trackOrders),
});
const mapDispatchToProp = {
  setPageTitle,
};

const TrackOrderDetailView = connect(mapStateToProps, mapDispatchToProp)(injectIntl(trackOrderDetailView));
export default TrackOrderDetailView;

