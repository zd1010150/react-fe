import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';

import Add from '../component/add';
import Table from '../component/table';

class accountView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.accounts');
  }
  render() {
    const { language } = this.props;
    return (
      <section className="section section-page">
        <div className="section-header"><Add language={language} /></div>
        <div className="section-content"><Table language={language} /></div>
        <div className="section-header" />
      </section>
    );
  }
}
accountView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProp = {
  setPageTitle,
};

const AccountView = connect(mapStateToProps, mapDispatchToProp)(accountView);
export default AccountView;

