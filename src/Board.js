import React from "react";
import Square from "./Square";

function Board(props) {
  const renderSquare = function (i) {
    const winningSquare = props.winCombo.includes(i) ? true : false;
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        winningSquare={winningSquare}
      />
    );
  };

  const renderRows = function () {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(j);
      }
      row = row.map((j) => renderSquare(j + i * 3));
      rows.push(row);
    }
    return rows.map((row, i) => (
      <div key={i} className="board-row">
        {row}
      </div>
    ));
  };

  return <div>{renderRows()}</div>;
}

export default Board;
