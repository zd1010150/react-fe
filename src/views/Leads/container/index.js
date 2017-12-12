import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import Add from '../component/add';
import Table from '../component/table';
// const accountView = () => <Add />;
class leadsView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.leads');
  }
  render() {
    return (
      <section className="section section-page">
        <div className="section-header"><Add /></div>
        <div className="section-content"><Table /></div>
        <div className="section-header"/>
      </section>
    );
  }
}
leadsView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};

const mapDispatchToProp = {
  setPageTitle,
};

const LeadsView = connect(null, mapDispatchToProp)(leadsView);
export default LeadsView;

