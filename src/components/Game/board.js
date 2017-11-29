import React from 'react'
import Square from './square'
export default class Board extends React.Component {

  renderSquare(i,col,row,isWinnerSquare) {
    return (
      <Square key={i}
        isWinnerSquare = {isWinnerSquare}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i,col,row)}
      />
    );
  }

  render() {
    let squares = () =>{
      let squares = [],winnerSquares = this.props.winnerSquares
      for (let y=0; y<3; y++){
        let aRowSquare = []
        for(let x=0; x < 3 ; x++){
          let seq = y*3 + x, isWinnerSquare = winnerSquares.indexOf(seq) > -1
          aRowSquare.push( this.renderSquare(seq,x,y,isWinnerSquare))
        }
        squares.push(<div className="board-row" key={y}>{aRowSquare}</div>)
      }
      return squares
    }
    return (
      <div>
        { squares() }
      </div>
    );
  }
}
