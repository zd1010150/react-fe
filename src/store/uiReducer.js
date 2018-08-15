import { combineReducers } from 'redux';
import { count } from 'components/page/HeaderContent/flow/reducer';
import { pageLoading } from 'components/page/pageLoading/flow/reducer';

export default combineReducers({
  count,
  pageLoading,
});

