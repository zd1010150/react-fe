/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setPageTitle, setOrderUser } from 'store/global/action';

import { getTotalLogisticFee } from 'views/Order/component/chooseLogistic/flow/action';
import { setDeliveryOrders } from 'views/Order/component/skeleton/flow/action';
import { setInvoiceInfo } from 'views/Order/component/confirmInvoice/flow/action';

import { setIdViewData, queryByPaging, queryBySearchKey, setTrackOrderDetailInfo, deleteDeliveryOrder } from '../flow/action';

import Table from '../component/table';
import SearchForm from '../component/searchForm';

class trackOrderView extends React.Component {
  componentDidMount() {
    const {
      setPageTitle,
      queryByPaging,
      trackOrderDataTablePagination,
    } = this.props;
    setPageTitle('global.pageTitle.trackOrders');
    queryByPaging(trackOrderDataTablePagination.perPage, trackOrderDataTablePagination.currentPage);
  }
  render() {
    const {
      queryBySearchKey,
      setIdViewData,
      orders,
      deliveryOrderStatus,
      queryByPaging,
      trackOrderDataTablePagination,
      defaultStatus,
      setTrackOrderDetailInfo,
      history,
      setInvoiceInfo,
      setDeliveryOrders,
      getTotalLogisticFee,
      deleteDeliveryOrder,
      setOrderUser,
    } = this.props;
    return (
      <section className="section section-page">
        <div className="section-header">
          <SearchForm
            onSubmit={({ status, name }) => {
              queryBySearchKey(status, name  || '');
            }}
            deliveryOrderStatus={deliveryOrderStatus}
            defaultStatus={defaultStatus}
          />
        </div>
        <div className="section-content">
          <Table
            history={history}
            setIdViewData={setIdViewData}
            setTrackOrderDetailInfo={setTrackOrderDetailInfo}
            deliveryOrderStatus={deliveryOrderStatus}
            orders={orders}
            queryByPaging={queryByPaging}
            trackOrderDataTablePagination={trackOrderDataTablePagination}
            setInvoiceInfo={setInvoiceInfo}
            setDeliveryOrders={setDeliveryOrders}
            getTotalLogisticFee={getTotalLogisticFee}
            deleteDeliveryOrder={deleteDeliveryOrder}
            setOrderUser={setOrderUser}
          />
        </div>
        <div className="section-header" />
      </section>
    );
  }
}
trackOrderView.defaultProps = {
  deliveryOrderStatus: [],
};
trackOrderView.propTypes = {
  queryBySearchKey: PropTypes.func.isRequired,
  deleteDeliveryOrder: PropTypes.func.isRequired,
  setIdViewData: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  setTrackOrderDetailInfo: PropTypes.func.isRequired,
  deliveryOrderStatus: PropTypes.array,
};
const mapStateToProps = ({ trackOrders, global }) => ({
  orders: trackOrders.orders,
  idViews: trackOrders.idViews,
  defaultStatus: trackOrders.searchKey.status,
  deliveryOrderStatus: global.settings.deliveryOrderStatus,
  trackOrderDataTablePagination: trackOrders.trackOrderDataTablePagination,
});
const mapDispatchToProp = {
  setPageTitle,
  queryByPaging,
  setIdViewData,
  queryBySearchKey,
  setTrackOrderDetailInfo,
  getTotalLogisticFee,
  setDeliveryOrders,
  setInvoiceInfo,
  deleteDeliveryOrder,
  setOrderUser,
};

const TrackOrderView = withRouter(connect(mapStateToProps, mapDispatchToProp)(trackOrderView));
export default TrackOrderView;
