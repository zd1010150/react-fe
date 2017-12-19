/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setOrderUser } from 'store/global/action';
import Table from '../component/table';
import { fetchLeads, updateLeads } from '../flow/action';

class tableView extends React.Component {
  componentDidMount() {
    this.props.fetchLeads();
  }
  render() {
    const {
      leadsData, setOrderUser, leadsDataTablePagination, updateLeads
    } = this.props;
    return (
      <Table setOrderUser={setOrderUser} leadsData={leadsData} leadsDataTablePagination={leadsDataTablePagination} fetchLeads={fetchLeads} updateLeads={updateLeads}/>
    );
  }
}
tableView.defaultProps = {
  leadsData: [],
};
tableView.propTypes = {
  leadsData: PropTypes.array,
  setOrderUser: PropTypes.func.isRequired,
  fetchLeads: PropTypes.func.isRequired,
  updateLeads: PropTypes.func.isRequired,
  leadsDataTablePagination: PropTypes.object.isRequired,
};
const mapStateToProps = ({ leads }) => ({
  leadsData: leads.leadsData,
  leadsDataTablePagination: leads.leadsDataTablePagination,
});
const mapDispatchToProp = {
  setOrderUser,
  fetchLeads,
  updateLeads,
};

const TableView = connect(mapStateToProps, mapDispatchToProp)(tableView);
export default TableView;
