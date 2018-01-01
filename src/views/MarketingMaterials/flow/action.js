import { get } from 'store/http/httpAction';
import { SET_MARKETING_MATERIAL } from './actionType';

export const receiveMarketingmaterials = marketingMaterias => ({
  type: SET_MARKETING_MATERIAL,
  marketingMaterias,
});
export const getMarketingMaterial = () => (dispath) => {
  get('/affiliate/marketing-materials', {}, dispath).then((data) => {
    console.log(data);
    dispath(receiveMarketingmaterials(data));
  });
};

