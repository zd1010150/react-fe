

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from 'store/global/action';
import { getMarketingMaterial, setMMLanguage, setMMCategory } from '../flow/action';
import Skeleton from '../component/skeleton';
import getVisibleMarketingMaterials from '../flow/reselect';

class mmView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.marketingMaterial');
    this.props.getMarketingMaterial();
  }
  render() {
    const {isLoading, visibleMarketingMaterials, category, setMMLanguage, setMMCategory} = this.props;
    return (
      <section className="section section-page">
        <span>loading: { JSON.stringify(this.props.loading)} </span>
        { JSON.stringify(visibleMarketingMaterials) }
        <Skeleton category={category} plans={visibleMarketingMaterials} setMMLanguage={setMMLanguage} setMMCategory={setMMCategory}/>
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
  loading: state.isLoading,
  visibleMarketingMaterials: getVisibleMarketingMaterials(state.marketingMaterials),
  category: state.global.settings.classification || [],
});
const mapDispatchToProp = {
  setPageTitle,
  getMarketingMaterial,
  setMMLanguage,
  setMMCategory
};

const MmView = connect(mapStateToProp, mapDispatchToProp)(mmView);
export default MmView;
