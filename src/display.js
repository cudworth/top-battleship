function drawGame(game) {
  const primary = drawBoard(document.getElementById('primary-gameboard'));
  const tracking = drawBoard(document.getElementById('tracking-gameboard'));

  tracking.addAttackListener(game);

  window.setInterval(() => {
    primary.render(game.gb1.getPrimary());
    tracking.render(game.gb1.getTracking());
  }, 500);
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

  function addAttackListener(game) {
    cells.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.addEventListener('click', () => {
          if (game.isMyTurn()) {
            const result = game.gb2.receiveAttack([r, c]);
            game.gb1.logAttack([r, c], result);
            if (result === 'miss') {
              game.nextTurn();
            }
            render(game.gb1.getTracking());
          }
        });
      });
    });
  }

  return { render, addAttackListener };
}

export default { drawGame };
