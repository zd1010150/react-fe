import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const TodoList = ({ onTodoClick, todos }) => (
  <ul>
    {
      todos.map(item => (
        <Item {...item} key={item.id} handleClick={() => { onTodoClick(item.id); }} />
      ))
    }
  </ul>);
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};
export default TodoList;
