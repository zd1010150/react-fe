
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
    const {isLoading, visibleMarketingMaterials, category, categorys, language, setMMLanguage, setMMCategory} = this.props;
    return (
      <section className="section section-page">
        <Skeleton categorys={categorys} plans={visibleMarketingMaterials} setMMLanguage={setMMLanguage} setMMCategory={setMMCategory} language={language} category={category} />
      </section>);
  }
}
mmView.defaultProps = {
  visibleMarketingMaterials: [],
  categorys: [],
};
mmView.propTypes = {
  category: PropTypes.number,
  categorys: PropTypes.array,
  setPageTitle: PropTypes.func.isRequired,
  visibleMarketingMaterials: PropTypes.array,
  getMarketingMaterial: PropTypes.func.isRequired,
};
const mapStateToProp = state => ({
  loading: state.isLoading,
  visibleMarketingMaterials: getVisibleMarketingMaterials(state.marketingMaterials),
  categorys: state.global.settings.classification,
  language: state.marketingMaterials.marketingLanguage,
  category: state.marketingMaterials.marketingCategory,
});
const mapDispatchToProp = {
  setPageTitle,
  getMarketingMaterial,
  setMMLanguage,
  setMMCategory,
};

const MmView = connect(mapStateToProp, mapDispatchToProp)(mmView);
export default MmView;
