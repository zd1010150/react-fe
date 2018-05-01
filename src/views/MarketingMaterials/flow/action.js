
import { get } from 'store/http/httpAction';
import { SET_MARKETING_MATERIAL, SET_MM_LANGUAGE, SET_MM_CATEGORY, SET_MM_PAGINATION } from './actionType';

export const setMMLanguage = language => ({
  type: SET_MM_LANGUAGE,
  language,
});
export const setMMCategory = category => ({
  type: SET_MM_CATEGORY,
  category,
});
export const setPagination = (classificationId, language, pagination) => ({
  type: SET_MM_PAGINATION,
  language,
  classificationId,
  pagination,
});
export const receiveMarketingmaterials = marketingMaterias => ({
  type: SET_MARKETING_MATERIAL,
  marketingMaterias,
});
export const getMarketingMaterial = (language, category, per_page, page) => (dispatch, getState) => {
  debugger;
  const allCategoryids = getState().global.settings.classification.map(c => c.id);
  if (allCategoryids.indexOf(category) < 0) {
    return;
  }
  const search = `language:${language};classification_id:${category}`;
  get('/affiliate/marketing-materials', { per_page, page, search }, dispatch).then((data) => {
    dispatch(receiveMarketingmaterials((data && data.data) || []));
    const { pagination } = data.meta;
    dispatch(setPagination(category, language, {
      perPage: pagination.per_page,
      currentPage: pagination.current_page,
      total: pagination.total,
    }));
  });
};
