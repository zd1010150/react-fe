/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import Table from './tableView';

class accountsView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.accounts');
  }
  render() {
    return (
      <section className="section section-page">
        <div className="section-content"><Table /></div>
        <div className="section-header" />
      </section>
    );
  }
}

accountsView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};
const mapStateToProps = ({ accounts }) => ({
  idViews: accounts.idViews,
});
const mapDispatchToProp = {
  setPageTitle,
};

const AccountsView = connect(mapStateToProps, mapDispatchToProp)(accountsView);
export default AccountsView;
