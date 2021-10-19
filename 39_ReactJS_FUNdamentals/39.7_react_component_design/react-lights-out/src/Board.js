import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import _ from "lodash"

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // DONE TODO: create array-of-arrays of true/false values
    for (let y=0; y<nrows; y++) {
      let newRow = [];
      for (let x=0; x<ncols; x++) {
        newRow.push(Math.random() * 100 < chanceLightStartsOn)
      }
      initialBoard.push(newRow)
    }
    return initialBoard;
  }

  function hasWon() {
    // DONE TODO: check the board in state to determine whether the player has won.
    const didTheyWin = board.filter(row => row.includes(true))
    return didTheyWin.length === 0
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // DONE TODO: Make a (deep) copy of the oldBoard
      let copyOldBoard = _.cloneDeep(oldBoard);

      // DONE TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copyOldBoard);
      flipCell(y, x+1, copyOldBoard);
      flipCell(y, x-1, copyOldBoard);
      flipCell(y+1, x, copyOldBoard);
      flipCell(y-1, x, copyOldBoard);


      // DONE TODO: return the copy
      return copyOldBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <h1>WOW YOU WON!</h1>
    )
  } else {
    return (
      <table>
        {
          board.map((row, y) => (
            <tr>{row.map((c, x) => (
              <Cell key={`${y}-${x}`} flipCellsAroundMe={evt => flipCellsAround(`${y}-${x}`)} isLit={c} />
            ))}</tr>
          ))
        }
      </table>
    )
  }
  // DONE TODO

  // make table board

  
}

Board.defaultProps = {
  nrows:5, 
  ncols:5,
  chanceLightStartsOn:10.0
}

export default Board;
