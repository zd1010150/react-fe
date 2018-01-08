/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setPageTitle, setOrderUser } from 'store/global/action';
import { resetOrder, setCurrentStep, setDeliveryOrders, deleteSplitOrder } from '../component/skeleton/flow/action';
import queryString from 'query-string';
import Skeleton from '../component/skeleton/index';


class orderView extends React.Component {
  constructor(props) {
    super(props);
    this.init(props);
  }
  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }
  init(props) {
    const {
      location,
      resetOrder,
      setCurrentStep,
      setDeliveryOrders,
      setPageTitle,
      deleteSplitOrder,
    } = props;
    const pairs = queryString.parse(location.search);
    const deliveryOrderId = (pairs && pairs.deliveryOrderId) || '';
    setPageTitle('global.pageTitle.order');
    if (!_.isEmpty(deliveryOrderId)) {
      resetOrder();
      setCurrentStep('chooseLogistic');
      setDeliveryOrders([Number(deliveryOrderId)]);
    } else {
      setCurrentStep('chooseUser');
      deleteSplitOrder();
    }
  }
  render() {
    return (
      <section className="section section-page">
        <div className="section-content"><Skeleton user={this.props.user || {}} setOrderUser={this.props.setOrderUser} /></div>
      </section>
    );
  }
}
orderView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};
const mapStateToProps = ({ global }) => ({
  user: global.orderUser,
});
const mapDispatchToProp = {
  setPageTitle,
  setOrderUser,
  resetOrder,
  setCurrentStep,
  setDeliveryOrders,
  deleteSplitOrder,
};

const OrderView = connect(mapStateToProps, mapDispatchToProp)(orderView);
export default OrderView;

