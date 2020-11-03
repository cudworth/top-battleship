//import ship from './ship';
import gameboard from './gameboard';
import player from './player';

const p1 = player();
const p2 = player();

const g1 = gameboard();
const g2 = gameboard();

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

const primary = document.getElementById('primary-gameboard');
const tracking = document.getElementById('tracking-gameboard');

function drawBoard(parent) {
  const game_board = [];
  parent.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'container';
  parent.append(container);
  for (let r = 0; r < 10; r++) {
    const row = document.createElement('div');
    row.className = 'row';
    game_board[r] = [];
    container.append(row);
    for (let c = 0; c < 10; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      row.append(cell);
      game_board[r][c] = cell;
    }
  }

  function render(board) {
    console.log(board);
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.ship) {
          game_board[r][c].classList.add('ship');
        } else {
          game_board[r][c].classList.remove('ship');
        }
        if (cell.attacked) {
          game_board[r][c].textContent = 'x';
        }
      });
    });
  }
  return { render, game_board };
}

const displayBoard = drawBoard(primary);
displayBoard.render(g1.getPrimary());
