import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    stepNumber: 0,
    xIsNext: true
  };

  handleClick(i) {
    //grabs every board history
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    //grabs the latest item added to the list
    const current = history[history.length - 1];
    //creates copy of current array
    const squares = current.squares.slice();
    //if calculateWinner(squares) returns a winner OR there's a value in squares[i], then return that array
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      //Within the Game’s handleClick method, we concatenate new history entries onto history.
      history: history.concat([{ squares: squares }]),
      //sets stepNumber equal to history.length
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
    console.log("testing");
  }
  //if step/move # is even, that means xIsNext is true, otherwise it's false
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    //if there is a move, then display that text, otherwise display go to game start
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";

      return (
        //we are going to return a list of buttons which if clicked, will take us back to that point in history
        //when we click on each button, we're going to invoke the jumpTo method and pass in the move we want to jump back to
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner " + winner;
    } else {
      status = "Next player " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      //add display moves here
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

//- If squares[a] has a value, and that value is equal to squares[b], and that value is equal to squares[c], *then* returns whatever is in  squares[a]  - "X", "O", or "null"

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
      return squares[a];
    }
  }
  return null;
}
