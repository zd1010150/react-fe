/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import { setIdViewData, queryByPaging, queryBySearchKey } from '../flow/action';
import Table from '../component/table';
import SearchForm from '../component/searchForm';

class leadsView extends React.Component {
  componentDidMount() {
    const { setPageTitle, queryByPaging, trackOrderDataTablePagination } = this.props;
    setPageTitle('global.pageTitle.leads');
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
    } = this.props;
    return (
      <section className="section section-page">
        <div className="section-header"><SearchForm onSubmit={(status, name) => queryBySearchKey(status, name)} deliveryOrderStatus={deliveryOrderStatus} /></div>
        <div className="section-content"><Table setIdViewData={setIdViewData} orders={orders} queryByPaging={queryByPaging} trackOrderDataTablePagination={trackOrderDataTablePagination} /></div>
        <div className="section-header" />
      </section>
    );
  }
}
leadsView.defaultProps = {
  deliveryOrderStatus: [],
}
leadsView.propTypes = {
  queryBySearchKey: PropTypes.func.isRequired,
  setIdViewData: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  deliveryOrderStatus: PropTypes.array,
};
const mapStateToProps = ({ trackOrders, global }) => ({
  orders: trackOrders.orders,
  idViews: trackOrders.idViews,
  deliveryOrderStatus: global.settings.deliveryOrderStatus,
  trackOrderDataTablePagination: trackOrders.trackOrderDataTablePagination
});
const mapDispatchToProp = {
  setPageTitle,
  queryByPaging,
  setIdViewData,
  queryBySearchKey,
};

const LeadsView = connect(mapStateToProps, mapDispatchToProp)(leadsView);
export default LeadsView;
