
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setOrderUser } from 'store/global/action';
import Table from '../component/table';
import { fetchLeads, updateLeads, deleteLeads } from '../flow/action';

class tableView extends React.Component {
  componentDidMount() {
    this.props.fetchLeads();
  }
  render() {
    const {
      leadsData,
      setOrderUser,
      leadsDataTablePagination,
      updateLeads,
      deleteLeads,
      fetchLeads,
      countries,
      affiliatedClientStatus,
    } = this.props;
    return (
      <Table setOrderUser={setOrderUser} leadsData={leadsData} leadsDataTablePagination={leadsDataTablePagination} fetchLeads={fetchLeads} updateLeads={updateLeads} deleteLeads={deleteLeads} affiliatedClientStatus={affiliatedClientStatus}/>
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
  deleteLeads: PropTypes.func.isRequired,
  leadsDataTablePagination: PropTypes.object.isRequired,

};
const mapStateToProps = ({ leads, global }) => ({
  leadsData: leads.leadsData,
  leadsDataTablePagination: leads.leadsDataTablePagination,
  affiliatedClientStatus: global.settings.affiliatedClientStatus,
});
const mapDispatchToProp = {
  setOrderUser,
  fetchLeads,
  updateLeads,
  deleteLeads,
};

const TableView = connect(mapStateToProps, mapDispatchToProp)(tableView);
export default TableView;
