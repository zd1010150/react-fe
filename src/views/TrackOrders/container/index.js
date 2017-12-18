/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import { setIdViewData, fetchTrackOrders, setSearchForm } from '../flow/action';
import Table from '../component/table';
import SearchForm from '../component/searchForm';

class leadsView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.leads');
    this.props.fetchTrackOrders();
  }
  render() {
    const {
      setSearchForm, setIdViewData, orders,
      deliveryOrderStatus,
    } = this.props;
    return (
      <section className="section section-page">
        <div className="section-header"><SearchForm onSubmit={(status, name) => setSearchForm(status, name)} deliveryOrderStatus={deliveryOrderStatus}/></div>
        <div className="section-content"><Table setIdViewData={setIdViewData} orders={orders} /></div>
        <div className="section-header" />
      </section>
    );
  }
}
leadsView.propTypes = {
  setSearchForm: PropTypes.func.isRequired,
  setIdViewData: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
};
const mapStateToProps = ({ trackOrders, global }) => ({
  orders: trackOrders.orders,
  idViews: trackOrders.idViews,
  deliveryOrderStatus: global.setting.deliveryOrderStatus,
});
const mapDispatchToProp = {
  setPageTitle,
  fetchTrackOrders,
  setIdViewData,
  setSearchForm,
};

const LeadsView = connect(mapStateToProps, mapDispatchToProp)(leadsView);
export default LeadsView;
