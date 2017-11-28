import React from 'react'
import PropTypes from 'prop-types';
class TodoItem extends React.Component{
          render(){
            return (
              <li style={{
                textDecoration: this.props.completed ? 'line-through' : 'none'
              }}>
                {this.props.text}
                <button onClick={()=>{this.props.handleDelete(this.props.id)}}>X</button>
              </li>)
          }
        }
TodoItem.propTypes = {
  completed: PropTypes.bool,
  text: PropTypes.string,
  handleDelete: PropTypes.func,
  id: PropTypes.string.isRequired
}
export default TodoItem
