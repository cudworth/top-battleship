const ship = require('./ship');

function gameBoard() {
  const primary = [];
  const tracking = [];
  const ships = [];

  for (let i = 0; i < 10; i++) {
    primary.push([]);
    tracking.push([]);
    for (let j = 0; j < 10; j++) {
      primary[i].push({ attacked: false, ship: null, ship_index: null });
      tracking[i].push({ attacked: false });
    }
  }

  const placeShip = function ([r0, c0, dir, length]) {
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
      } else if (primary[r][c].ship) {
        success = false;
      }
    });

    if (success) {
      indices.forEach(([r, c], i) => {
        primary[r][c].ship = myShip;
        primary[r][c].ship_index = i;
      });
    }
    return success;
  };

  const receiveAttack = function ([r, c]) {
    const cell = primary[r][c];
    cell.attacked = true;
    if (cell.ship) {
      cell.ship.hit(cell.ship_index);
      cell.ship.isSunk() ? console.log('YSMB') : null;
      return 'hit';
    } else {
      return 'miss';
    }
  };

  const allShipsSunk = function () {
    return ships.every((ship) => {
      return ship.isSunk();
    });
  };

  const getPrimary = () => copyBoard(primary);
  const getTracking = () => copyBoard(tracking);

  const copyBoard = function (board) {
    const copy = board.map((row) => {
      return row.map((cell) => {
        return { ...cell };
      });
    });
    return copy;
  };

  return { placeShip, receiveAttack, getPrimary, getTracking, allShipsSunk };
}

module.exports = gameBoard;
