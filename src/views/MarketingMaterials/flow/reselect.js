import { createSelector } from 'reselect';


const getMarketingLanuageSelector = marketingMaterials => marketingMaterials.marketingLanguage;
const getMarketingCategorySelector = marketingMaterials => marketingMaterials.marketingCategory;
const getMarketingMaterialsSelector = marketingMaterials => marketingMaterials.marketingMaterias;

const getVisibleMarketingMaterials = createSelector(
  [
    getMarketingMaterialsSelector,
    getMarketingLanuageSelector,
    getMarketingCategorySelector,
  ],
  (all, language, category) => all.filter(item => item.classification_id === category && item.language === language),
);
export default getVisibleMarketingMaterials;
