

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import { getMarketingMaterial } from '../flow/action';
import Skeleton from '../component/skeleton';


class mmView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.marketingMaterial');
    this.props.getMarketingMaterial();
  }
  render() {
    return (
      <section className="section section-page">
        <span>loading: { JSON.stringify(this.props.loading)} </span>
        { JSON.stringify(this.props.marketingMaterials) }
      </section>);
  }
}
mmView.defaultProps = {
  marketingMaterials: {},
};
mmView.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  marketingMaterials: PropTypes.object,
  getMarketingMaterial: PropTypes.func.isRequired,
};
const mapStateToProp = state => ({
  marketingMaterials: state.marketingMaterials,
  loading: state.loading,
});
const mapDispatchToProp = {
  setPageTitle,
  getMarketingMaterial,
};

const MmView = connect(mapStateToProp, mapDispatchToProp)(mmView);
export default MmView;
