//const ship = require('./ship');
import ship from './ship';

function gameBoard() {
  const board = [];
  const ships = [];

  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push({ attacked: false, ship: null, ship_index: null });
    }
  }

  function placeShip([r0, c0, dir, length]) {
    const indices = [];

    const myShip = ship(length);
    ships.push(myShip);

    for (let n = 0; n < length; n++) {
      switch (dir) {
        case 0:
          indices.push([r0, c0 + n]);
          break;
        case 90:
          indices.push([r0 - n, c0]);
          break;
        case 180:
          indices.push([r0, c0 - n]);
          break;
        case 270:
          indices.push([r0 + n, c0]);
          break;
      }
    }

    let success = true;

    indices.forEach(([r, c]) => {
      if (r < 0 || 9 < r || c < 0 || 9 < c) {
        success = false;
      } else if (board[r][c].ship) {
        success = false;
      }
    });

    if (success) {
      indices.forEach(([r, c], i) => {
        board[r][c].ship = myShip;
        board[r][c].ship_index = i;
      });
    }
    return success;
  }

  function receiveAttack([r, c]) {
    const cell = board[r][c];
    if (cell.ship) {
      cell.ship.hit(cell.ship_index);
      cell.attacked = 'hit';
      return 'hit';
    } else {
      cell.attacked = 'miss';
      return 'miss';
    }
  }

  function allShipsSunk() {
    return ships.every((ship) => {
      return ship.isSunk();
    });
  }

  function getBoard() {
    const copy = board.map((row) => {
      return row.map((cell) => {
        return { ...cell };
      });
    });
    return copy;
  }

  return {
    placeShip,
    receiveAttack,
    getBoard,
    allShipsSunk,
  };
}

//module.exports = gameBoard;
export default gameBoard;
