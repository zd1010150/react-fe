/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import Add from '../component/add';
import Table from './tableView';
import { addLeads } from '../flow/action';
import { setEditProvince } from 'components/page/LeadsAndAccountsEditAddDialog/flow/action';


class leadsView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.leads');
  }
  render() {
    const { addLeads, setEditProvince, provinces } = this.props;
    return (
      <section className="section section-page">
        <div className="section-header"><Add addLeads={addLeads} setEditProvince={setEditProvince} provinces={provinces} /></div>
        <div className="section-content"><Table /></div>
        <div className="section-header" />
      </section>
    );
  }
}

leadsView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  addLeads: PropTypes.func.isRequired,
};
const mapStateToProps = ({ leads, ui }) => ({
  idViews: leads.idViews,
  provinces: ui.userEdit.provinces,
});
const mapDispatchToProp = {
  setPageTitle,
  addLeads,
  setEditProvince,
};

const LeadsView = connect(mapStateToProps, mapDispatchToProp)(leadsView);
export default LeadsView;
