

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import Add from '../component/add';

// const accountView = () => <Add />;
class mmView extends React.Component {
  componentDidMount() {
    console.log(this.props.setPageTitle, "====monunt")
    this.props.setPageTitle('global.pageTitle.marketingMaterial');
  }
  render() {
    return <div><Add /></div>;
  }
}
mmView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
};
const mapDispatchToProp = {
  setPageTitle,
};

const MmView = connect(null, mapDispatchToProp)(mmView);
export default MmView;

