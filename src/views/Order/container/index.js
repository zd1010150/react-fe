/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setPageTitle, resetUser } from 'store/global/action';
import { setNeedCreateInvoice } from '../component/chooseLogistic/flow/action';
import { resetOrder, setCurrentStep, setDeliveryOrders, deleteSplitOrder } from '../component/skeleton/flow/action';
import queryString from 'query-string';
import Skeleton from '../component/skeleton/index';


class orderView extends React.Component {
  constructor(props) {
    super(props);
    this.init(props);
  }
  // componentWillReceiveProps(nextProps) {
  //   this.init(nextProps);
  // }
  init(props) {
    const {
      location,
      resetOrder,
      resetUser,
      setCurrentStep,
      setDeliveryOrders,
      setPageTitle,
      deleteSplitOrder,
      setNeedCreateInvoice,
      user,
    } = props;
    const pairs = queryString.parse(location.search);
    const userId = (pairs && pairs.userId) || '';
    const deliveryOrderId = (pairs && pairs.deliveryOrderId) || '';
    const needCreateBatchCreate = (pairs && pairs.needCreateBatchCreate);
    setPageTitle('global.pageTitle.order');
    if (!_.isEmpty(deliveryOrderId)) {
      deleteSplitOrder();
      setCurrentStep('chooseLogistic');
      setDeliveryOrders([Number(deliveryOrderId)]);
    } else {
      setCurrentStep('chooseUser');
      deleteSplitOrder();
      resetOrder();
      if ((_.isEmpty(userId)) || _.isEmpty(user)) {
        resetUser();
      }
    }
    setNeedCreateInvoice(_.isEmpty(needCreateBatchCreate) || (needCreateBatchCreate === 'true'));
  }
  render() {
    return (
      <section className="section section-page">
        <div className="section-content"><Skeleton /></div>
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
  resetOrder,
  setCurrentStep,
  setDeliveryOrders,
  deleteSplitOrder,
  setNeedCreateInvoice,
  resetUser,
};

const OrderView = connect(mapStateToProps, mapDispatchToProp)(orderView);
export default OrderView;

