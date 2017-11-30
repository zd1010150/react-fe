import React from 'react'
import { addTodo } from '../flow/action'
import { connect } from 'react-redux'
class Add extends React.Component{
  constructor(props){
    super(props)
    this.state = { text: "" }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({ text: e.target.value })
    //e.persist()
    // setTimeout(()=>{
    //   console.log("setTimeout", e && e.target)
    // },1000)
  }
  render(){
    return (
      <div>
        <br/>
        <input value={ this.state.text } type="text" onChange = { this.handleChange }/>
        <button onClick = { (e) => { this.props.dispatch(addTodo(this.state.text)) }}>add</button>
      </div>
    )
  }
}
const AddTodo = connect()(Add)
export default AddTodo
