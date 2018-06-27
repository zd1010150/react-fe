/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import Table from './tableView';

class InventoryView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.inventoryAffiliate');
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

InventoryView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};

const mapDispatchToProp = {
  setPageTitle,
};

export default connect(null, mapDispatchToProp)(InventoryView);
