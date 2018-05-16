
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { setPageTitle } from 'store/global/action';
import { getMarketingMaterial, setMMLanguage, setMMCategory } from '../flow/action';
import Skeleton from '../component/skeleton';
import { getClassificationPagination, getLanguageClassification } from '../flow/reselect';
import styles from '../MarketingMaterials.less';


const cx = classNames.bind(styles);

class mmView extends React.Component {
  componentDidMount() {
    this.props.setPageTitle('global.pageTitle.marketingMaterial');
  }
  render() {
    const {
      visibleMarketingMaterials,
      category,
      categorys,
      language,
      setMMLanguage,
      setMMCategory,
      getMarketingMaterial,
      allPaginations,
    } = this.props;
    return (
      <section className={classNames('section section-page', cx('mm-page'))}>
        <Skeleton
          categorys={categorys}
          plans={visibleMarketingMaterials}
          setMMLanguage={setMMLanguage}
          setMMCategory={setMMCategory}
          language={language}
          category={category}
          getMarketingMaterial={getMarketingMaterial}
          allPaginations={allPaginations}
        />
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
  allPaginations: PropTypes.array.isRequired,
};
const mapStateToProp = state => ({
  visibleMarketingMaterials: state.marketingMaterials.marketingMaterias,
  categorys: getLanguageClassification(state),
  language: state.marketingMaterials.marketingLanguage,
  category: state.marketingMaterials.marketingCategory,
  allPaginations: state.marketingMaterials.marketingPagination,
});
const mapDispatchToProp = {
  setPageTitle,
  getMarketingMaterial,
  setMMLanguage,
  setMMCategory,
};

const MmView = connect(mapStateToProp, mapDispatchToProp)(mmView);
export default MmView;
