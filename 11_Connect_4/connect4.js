/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2, must be let so the primitive type can be toggled
const board = []; // array of rows, each row is array of cells  (board[y][x])
const htmlBoard = document.querySelector('#board');
/** DONE makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(width, height) {
  // DONE TODO: set "board" to empty HEIGHT x WIDTH matrix array 
  
  for (let y = 0; y < height; y++) {
    let new_row = [];
    for (let x = 0; x < width; x++) {
      new_row.push(null);
    }
    board.push(new_row); 
  }
}

/** DONE makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard(js_board) {
  // DONE TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  // DONE TODO: add comment for this code
  const top = document.createElement("tr"); //Creates an HTML table row element
  top.setAttribute("id", "column-top"); //sets attribute data of the element to be "column-top"
  top.addEventListener("click", handleClick); //apply event listener (will be delegated listener for child td elements)

  for (let x = 0; x < WIDTH; x++) {  //creates arrow of clickable cells, sets attribute a column number
    const headCell = document.createElement("td"); 
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top); //Appends top row to html game board

  // DONE TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); //creates a row based off height variable
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //fills row with data cell elements
      cell.setAttribute("id", `${y}-${x}`); //sets id attribute as location in array
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // DONE TODO: write the real version of this, rather than always returning 0
  
  for (let y=5; y>=0; y--) { //checks the x position of each row array of board for null starting at the end (bottom of the board), returns first null position
    if (board[y][x] === null) { //checks each y at fixed position x where click occurred
      return y; //returns first time y is null, if it goes through full loop without finding one, that means the column is maxed out and no action should occur in the click event
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  board[y][x] = currPlayer; //updates JS representation of board tracking where each player has placed pieces
  let cellEdit = htmlBoard.querySelector(`td[id="${y}-${x}"]`); //grabs the data cell with the coordinates denoted by the attribute
  cellEdit.classList.add('piece'); //adds class to change data cell from square to circle
  if (currPlayer === 1) {
    cellEdit.style.backgroundColor = 'red'; //handles player1/2 color logic
  }
  else {
    cellEdit.style.backgroundColor = 'blue';
  }
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg) //announces which player has won
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // DONE in placeInTable function TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  let tie_check = [...board].reduce((row_container, row) => { //tie_check consolidates every row of the gameboard into an array of T/F based on whether or not the row is filled without a winner being declared
    row_container.push(row.every(cell => cell !== null)); //checks if entire row is not null returns T/F
    return row_container; //returns array filled with T/F results from each row
  }, []).every(element => element === true); //checks if entire results array is true, meaning gameboard is filled and no winner is declared

 if (tie_check) {
   endGame("It's a tie!");
 }
 


  // switch players
  // DONE TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1) { //If the currplayer is 1 change it to 2 at the end of the cycle, if it is not, it must be 2 so change it back to 1
    currPlayer = 2;
  }
  else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) => //checks if all x & y values are within game boundaries and placed by the same player
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { //goes through enach row representing different levels of game board
    for (let x = 0; x < WIDTH; x++) { //goes through each element of each row
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //builds an array of each element, plus three elements down line 'horizontally'
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //builds an array of each element, plus three elements in the same x position but of higher row value
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //builds an array of each element, plus three elements incremented in x and row position 'diagonally right'
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //builds an array of each element, plus three elements incremented in x and row position 'diagonally left'

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //sends win possibilty arrays to be checked
        return true; //if any come back true, it returns a value of true to the click event function
      }
    }
  }
}

makeBoard(WIDTH, HEIGHT);
makeHtmlBoard(board);
