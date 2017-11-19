import React from 'react'
export default class Add extends React.Component{
  constructor(props){
    super(props)
    this.state = { text: "" }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    console.log(e.target)
    this.setState({ text: e.target.value })
    e.persist()
    setTimeout(()=>{
      console.log("setTimeout", e && e.target)
    },1000)
  }
  render(){
    return (
      <div>
        <br/>
        <input value={ this.state.text } type="text" onChange = { this.handleChange }/>
        <button onClick = { (e) => {this.props.handleAdd(this.state.text)
        } }>add</button>
      </div>
    )
  }
}
