import { createSelector } from 'reselect';
import { paginationPayload } from './reducer';

const getMarketingLanuageSelector = state => state.marketingMaterials.marketingLanguage;
const getClassificaitonSelector = state => state.global.settings.classification;

export const getLanguageClassification = createSelector([getClassificaitonSelector, getMarketingLanuageSelector], (classification, langauge) => {
  const filedKey = langauge === 'zh' ? 'name' : 'name_en';
  return classification.map(item => Object.assign({}, item, { name: item[filedKey] }));
});


