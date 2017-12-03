
import { injectReducers } from '../../store/reducers';

import LanguageView from './container/index';
import HeaderReducers from './flow/reducer';

const Header = (store) => {
  injectReducers(store, {
    global: HeaderReducers,
  });
  return LanguageView;
};
export default Header;
