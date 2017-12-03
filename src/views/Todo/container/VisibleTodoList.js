import { connect } from 'react-redux';
import TodoList from '../component/TodoList';

import { toggleTodo } from '../flow/action';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(item => !item.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(item => item.completed);
    default:
      return todos;
  }
};
const mapStateToProps = ({ todo }) => ({
  todos: getVisibleTodos(todo.todos, todo.visibilityFilter),
});
const mapDispatchToProps = {
  onTodoClick: toggleTodo,
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default VisibleTodoList;
