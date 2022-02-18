import React from "react";
import Board from "./Board";
import calculateWinner from "./calc-win";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      timeTravel: null,
      ascendingOrder: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (!squares[i] && !calculateWinner(squares)) {
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([{ squares }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        timeTravel: null,
      });
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      timeTravel: step,
    });
  }

  flipOrder() {
    this.setState({ ascendingOrder: !this.state.ascendingOrder });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerObj = calculateWinner(current.squares);
    const order = this.state.ascendingOrder;

    const moves = history.map((step, move) => {
      let desc;
      if (move > 0) {
        for (let i = 0; i < step.squares.length; i++) {
          if (step.squares[i] !== history[move - 1].squares[i]) {
            let col = (i + 1) % 3 === 0 ? 3 : (i + 2) % 3 === 0 ? 2 : 1;
            let row = i < 3 ? 1 : i < 6 ? 2 : 3;
            desc = `move @(${col}, ${row})`;
          }
        }
      } else {
        desc = "Game start";
      }

      const className = this.state.timeTravel === move ? "btn dark" : "btn";

      return (
        <li key={move}>
          <button className={className} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    if (order) {
      moves.reverse();
    }

    const orderText = this.state.ascendingOrder ? "ascending" : "descending";

    let status;
    let winCombo = [];
    if (winnerObj) {
      status = "Winner: " + winnerObj.winner;
      winCombo = winnerObj.winCombo;
    } else if (!winnerObj && current.squares.every((e) => e)) {
      status = "Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winCombo={winCombo}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="order-btn" onClick={() => this.flipOrder()}>
            {orderText + " moves"}
          </button>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
