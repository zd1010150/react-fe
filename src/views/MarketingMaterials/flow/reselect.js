import { createSelector } from 'reselect';


const getMarketingLanuageSelector = state => state.marketingMaterials.marketingLanguage;
const getMarketingCategorySelector = state => state.marketingMaterials.marketingCategory;
const getMarketingMaterialsSelector = state => state.marketingMaterials.marketingMaterias;

const getClassificaitonSelector = state => state.global.settings.classification;

export const getLanguageClassification = createSelector([getClassificaitonSelector, getMarketingLanuageSelector], (classification, langauge) => {
  const filedKey = langauge === 'zh' ? 'name' : 'name_en';
  return classification.map(item => Object.assign({}, item, { name: item[filedKey] }));
});

export const getVisibleMarketingMaterials = createSelector(
  [
    getMarketingMaterialsSelector,
    getMarketingLanuageSelector,
    getMarketingCategorySelector,
  ],
  (all, language, category) => all.filter(item =>
    item.classification_id === category && item.language === language),
);

