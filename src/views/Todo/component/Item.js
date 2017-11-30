import React from 'react'
import PropTypes from 'prop-types';
class TodoItem extends React.Component{
          render(){
            return (
              <li style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none'
                }}
                  onClick={()=>{this.props.handleClick(this.props.id)}}
              >
                {this.props.text}
              </li>)
          }
        }
TodoItem.propTypes = {
  completed: PropTypes.bool,
  text: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}
export default TodoItem
