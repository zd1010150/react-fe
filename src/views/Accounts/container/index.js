import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import Add from '../component/add';

// const accountView = () => <Add />;
class accountView extends React.Component {
  componentDidMount() {
    // debugger;
    // console.log(this.props.setPageTitle, "====monunt")
    this.props.setPageTitle('global.pageTitle.accounts');
    console.log("ACCOUNT VIEW", "dID MOUNT")
  }
  render() {
    return <div><Add /></div>;
  }
}
accountView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};
const mapDispatchToProp = {
  setPageTitle,
};

const AccountView = connect(undefined, mapDispatchToProp)(accountView);
export default AccountView;

