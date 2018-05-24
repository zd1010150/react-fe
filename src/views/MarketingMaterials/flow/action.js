
import { get } from 'store/http/httpAction';
import _ from 'lodash';
import { SET_MARKETING_MATERIAL, SET_MM_LANGUAGE, SET_MM_CATEGORY, SET_MM_PAGINATION } from './actionType';
import { getAllClassificationids } from './reselect';

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
  const allCategoryids = getAllClassificationids(getState());
  if (allCategoryids.indexOf(category) < 0) {
    return;
  }
  const search = `language:${language}`;
  get('/affiliate/marketing-materials', {
    per_page,
    page,
    search,
    'classification_id[]': category,
    searchJoin: 'and',
  }, dispatch).then((data) => {
    dispatch(receiveMarketingmaterials((data && data.data) || []));
    if (!_.isEmpty(data && data.meta)) {
      const { pagination } = data.meta;
      dispatch(setPagination(category, language, {
        perPage: pagination.per_page,
        currentPage: pagination.current_page,
        total: pagination.total,
      }));
    }
  });
};

