
import { get } from 'store/http/httpAction';
import { SET_MARKETING_MATERIAL, SET_MM_LANGUAGE, SET_MM_CATEGORY } from './actionType';


export const setMMLanguage = language => ({
  type: SET_MM_LANGUAGE,
  language,
});
export const setMMCategory = category => ({
  type: SET_MM_CATEGORY,
  category,
});
export const receiveMarketingmaterials = marketingMaterias => ({
  type: SET_MARKETING_MATERIAL,
  marketingMaterias,
});
export const getMarketingMaterial = () => (dispath) => {
  get('/affiliate/marketing-materials', {}, dispath).then((data) => {
    dispath(receiveMarketingmaterials((data && data.data) || []));
  });
};
