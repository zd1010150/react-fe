
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setOrderUser } from 'store/global/action';
import Table from '../component/table';
import { fetchAccount, updateAccount } from '../flow/action';

class tableView extends React.Component {
  componentDidMount() {
    this.props.fetchAccount();
  }
  render() {
    const { accountData, setOrderUser, accountDataTablePagination, updateAccount, fetchAccount, } = this.props;
    return (
      <Table setOrderUser={setOrderUser} accountData={accountData} accountDataTablePagination={accountDataTablePagination} fetchAccounts={fetchAccount} updateAccount={updateAccount} />
    );
  }
}
tableView.defaultProps = {
  accountData: [],
};
tableView.propTypes = {
  accountData: PropTypes.array,
  setOrderUser: PropTypes.func.isRequired,
  fetchAccount: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
  accountDataTablePagination: PropTypes.object.isRequired,
};
const mapStateToProps = ({ accounts }) => ({
  accountData: accounts.accountsData,
  accountDataTablePagination: accounts.accountsDataTablePagination,
});
const mapDispatchToProp = {
  setOrderUser,
  fetchAccount,
  updateAccount,
};

const TableView = connect(mapStateToProps, mapDispatchToProp)(tableView);
export default TableView;
