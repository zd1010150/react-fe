import reddiPosts from 'views/Reddiposts/flow/reducer';
import todo from 'views/Todo/flow/reducers/index';
import order from 'views/Order/flow/reducer';
import price from 'views/PriceSetting/flow/priceReducer';
import marketingMaterials from 'views/MarketingMaterials/flow/reducer';
import trackOrders from 'views/TrackOrders/flow/reducer';
import leads from 'views/Leads/flow/reducer';
import accounts from 'views/Accounts/flow/reducer';
import cms from 'views/CMS/flow/reducer';

export default {
  reddiPosts,
  todo,
  order,
  price,
  marketingMaterials,
  trackOrders,
  leads,
  accounts,
  cms
};
