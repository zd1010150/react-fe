import React from 'react';
import { AddTodo,ItemTodo } from "../components/Todo"
export default class Todolist extends React.Component {
  constructor(props) {
    super(props)
    this.state = { todo: [] , SEED_ID: 0}
    this.handleAdd = this.handleAdd.bind(this)
  }
  handleAdd(text){
    this.setState((preState,props)=>{
      return {
        todo: preState.todo.concat([{
          text: text,
          id:preState.SEED_ID
        }]),
        SEED_ID: preState.SEED_ID+1
      }
    })
  }
  handleDelete(id){
    this.setState((preState,props)=>{
      return {
        todo: preState.todo.filter((item)=>{
          return item.id !== id
        })
      }
    })
  }


  render() {
    const lists = this.state.todo.map((item)=>{
      const handleDelete = ()=>{
        this.handleDelete(item.id)
      }
      return (<ItemTodo handleDelete={handleDelete} key={item.id} text={item.text}></ItemTodo>)
    })
    return (
      <div>
      <AddTodo handleAdd = { this.handleAdd }></AddTodo>
      <ul>
        { lists }
      </ul>
      </div>
    )
  }
}
