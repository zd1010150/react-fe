
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import Add from '../component/add';

class priceSettingView extends React.Component {
  componentDidMount() {
    // debugger;
    // console.log(this.props.setPageTitle, "====monunt")
    this.props.setPageTitle('global.pageTitle.priceSetting');
    console.log("pricesetting  view", "dID MOUNT");
  }
  render() {
    return <div><Add /></div>;
  }
}
priceSettingView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};
const mapDispatchToProp = {
  setPageTitle,
};

const PriceSettingView = connect(null, mapDispatchToProp)(priceSettingView);
export default PriceSettingView;

