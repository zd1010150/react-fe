
import { injectReducers } from '../../store/reducers';

import TodoView from './container/index';
import TodoReducers from './flow/reducers/index';
import reddiPostReducers from '../Reddiposts/flow/reducer';

const Todo = (store) => {
  injectReducers(store, {
    todo: TodoReducers,
    reddiPosts: reddiPostReducers,
  });
  return TodoView;
};
export default Todo;
