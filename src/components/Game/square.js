import React from 'react'
export default class Square extends React.Component {

  render(){
    let className = ["square",this.props.isWinnerSquare ? "win-square" : ""]
    return (
      <button onClick={ this.props.onClick } className={className.join(" ")}>
        { this.props.value}
      </button>
    )
  }

}
