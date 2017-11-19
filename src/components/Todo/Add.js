import React from 'react'
export default class Add extends React.Component{
  constructor(props){
    super(props)
    this.state = { text: "" }
  }

  render(){
    return (
      <div>
        <br/>
        <input value={ this.state.text } />
        <button onClick = { (e) => {this.props.handleAdd(this.state.text)
        } }>add</button>
      </div>
    )
  }
}
