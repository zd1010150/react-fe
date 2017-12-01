/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions,max-len */
import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  completed, handleClick, text, id,
}) => (<li style={{ textDecoration: completed ? 'line-through' : 'none' }} onClick={() => { handleClick(id); }}> { text } </li>);
TodoItem.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
export default TodoItem;
