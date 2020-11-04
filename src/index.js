//import ship from './ship';
import gameboard from './gameboard';
import player from './player';

const p1 = player();
const p2 = player();

const g1 = gameboard();
const g2 = gameboard();

placeShipsRandomly(g1);
placeShipsRandomly(g2);

/*
const s1 = [
  { len: 5, r: 0, c: 0, dir: 270 },
  { len: 4, r: 0, c: 2, dir: 270 },
  { len: 3, r: 0, c: 4, dir: 270 },
  { len: 2, r: 0, c: 6, dir: 270 },
];

function placeships(ships, board) {
  ships.forEach((obj) => {
    const { len, r, c, dir } = obj;
    board.placeShip([r, c, dir, len]);
  });
}

placeships(s1, g1);
*/

function placeShipsRandomly(board) {
  const dirs = [0, 90, 180, 270];
  const locs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const lengths = [5, 4, 3, 2, 1];
  const rnd = getRandomFromArray;
  lengths.forEach((len) => {
    let success = false;
    while (success === false) {
      const guess = [rnd(locs), rnd(locs), rnd(dirs), len];
      console.log(guess);
      success = board.placeShip(guess);
      console.log(success);
    }
  });
}

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function drawBoard(parent) {
  const cells = [];
  parent.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'grid';
  parent.append(grid);
  for (let r = 0; r < 10; r++) {
    const row = document.createElement('div');
    row.className = 'row';
    cells[r] = [];
    grid.append(row);
    for (let c = 0; c < 10; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      row.append(cell);
      cells[r][c] = cell;
    }
  }

  function addAttackListener(myBoard, opponentBoard) {
    cells.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.addEventListener('click', () => {
          if (myTurn) {
            const result = opponentBoard.receiveAttack([r, c]);
            myBoard.logAttack([r, c], result);
            if (result === 'miss') {
              myTurn = !myTurn;
            }
            render(myBoard.getTracking());
          }
        });
      });
    });
  }

  function render(board) {
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.ship) {
          cells[r][c].classList.add('ship');
        } else {
          cells[r][c].classList.remove('ship');
        }
        if (cell.attacked === 'hit') {
          cells[r][c].classList.add('hit');
        } else if (cell.attacked === 'miss') {
          cells[r][c].classList.add('miss');
        }
      });
    });
  }
  return { render, addAttackListener };
}

const primaryBoard = drawBoard(document.getElementById('primary-gameboard'));
const trackingBoard = drawBoard(document.getElementById('tracking-gameboard'));
trackingBoard.addAttackListener(g1, g2);

primaryBoard.render(g1.getPrimary());
trackingBoard.render(g1.getTracking());
console.log(g1.getPrimary());

let myTurn = true;

window.setInterval(() => {
  if (!myTurn) {
    const result = g1.receiveAttack(p2.randomAttack());
    primaryBoard.render(g1.getPrimary());
    if (result === 'miss') {
      myTurn = !myTurn;
    }
  }
}, 2000);
