import { createSelector } from 'reselect';
import _ from 'lodash';

const getMarketingLanuageSelector = state => state.marketingMaterials.marketingLanguage;
const getClassificaitonSelector = state => state.global.settings.classification;

export const getLanguageClassification = createSelector([getClassificaitonSelector, getMarketingLanuageSelector], (classification, langauge) => {
  const filedKey = langauge === 'zh' ? 'name' : 'name_en';
  const addMenuTitle = (category) => {
    if (!_.isEmpty(category.sub_classification)) {
      const subCategories = category.sub_classification.map(subCategory => addMenuTitle(subCategory));
      return { id: category.id, menuTitle: category[filedKey], subCategories };
    }
    return { id: category.id, menuTitle: category[filedKey] };
  };
  return classification.map(item => addMenuTitle(item));
});

export const getAllClassificationids = createSelector([getClassificaitonSelector], (classification) => {
  const ids = [];
  const getId = (category) => {
    if (!_.isEmpty(category.sub_classification)) {
      category.sub_classification.forEach(subCategory => getId(subCategory));
    }
    ids.push(category.id);
  };
  classification.forEach(item => getId(item));
  return ids;
});

