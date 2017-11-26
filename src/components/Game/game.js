
import React from 'react'
import Board from './board'
export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i,col,row) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const { winner, winnerSquares } = calculateWinner(squares)
    if ( winner || squares[i]) {
        return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          col: col,
          row: row
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });

  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, winnerSquares } = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move +"col:" + step.col + " row:" + step.row:
        'Go to game start';
      return (
        <li key={move} className={ this.state.stepNumber == move ? "selected" : ""}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;

    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winnerSquares = { winnerSquares }
            squares={current.squares}
            onClick={(i,col,row) => this.handleClick(i,col,row)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol className = "move-list">{moves}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winnerSquares : [a,b,c]
      }
    }
  }
  return {
    winner: null,
    winnerSquares : []
  };
}
