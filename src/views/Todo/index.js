
import { injectReducers } from '../../store/reducers'

import TodoView from './container/index'
import TodoReducers from './flow/reducers/index'

const Todo = (store) =>{
  injectReducers(store,{
    todo: TodoReducers
  })
  return TodoView
}
export default Todo
