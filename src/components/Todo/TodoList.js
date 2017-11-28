import React from 'react'
import PropTypes from 'prop-types'
import Item from "./Item"
class TodoList extends React.Component{
          render(){
            const lists = this.props.todos.map((item)=>{
              const handleDelete = ()=>{
                this.handleDelete(item.id)
              }
              return (<ItemTodo handleDelete={handleDelete} key={item.id} text={item.text}></ItemTodo>)
            })
            return (
              <ul>
                {
                  this.props.todos.map((item)=>{
                    return (
                      <Item {...item} key={item.id} handleClick={()=>{ this.props.onTodoClick(item.id)}} ></Item>
                    )
                  })
                }
              </ul>)
          }
        }
TodoList.propTypes = {
  todos: todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}
export default TodoList
