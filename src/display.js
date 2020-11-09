function displayController() {
  const db1 = drawBoard(document.getElementById('p1-gameboard'));
  const db2 = drawBoard(document.getElementById('p2-gameboard'));
  const gameStatus = document.getElementById('game-status');

  function drawBoard(parent) {
    parent.innerHTML = '';
    const cells = [];
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
    return cells;
  }

  function render(gb1, gb2, status, cb) {
    renderActive(gb1, db1);
    renderInactive(gb2, db2);
    addAttackListener(db2, cb);
    setStatus(status);
  }

  function renderActive(gameBoard, displayBoard) {
    gameBoard.forEach((row, r) => {
      row.forEach((cell, c) => {
        displayBoard[r][c].classList.remove('ship', 'hit', 'miss');
        if (cell.ship) {
          displayBoard[r][c].classList.add('ship');
        } else {
          displayBoard[r][c].classList.remove('ship');
        }
        if (cell.attacked === 'hit') {
          displayBoard[r][c].classList.add('hit');
        } else if (cell.attacked === 'miss') {
          displayBoard[r][c].classList.add('miss');
        }
      });
    });
  }

  function renderInactive(gameBoard, displayBoard) {
    gameBoard.forEach((row, r) => {
      row.forEach((cell, c) => {
        displayBoard[r][c].classList.remove('ship', 'hit', 'miss');
        if (cell.attacked === 'hit') {
          displayBoard[r][c].classList.add('hit');
        } else if (cell.attacked === 'miss') {
          displayBoard[r][c].classList.add('miss');
        }
      });
    });
  }

  function setStatus(status) {
    gameStatus.textContent = status;
  }

  function addAttackListener(displayBoard, cb) {
    displayBoard.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.addEventListener('click', () => cb([r, c]));
      });
    });
  }

  return { render };
}

export default displayController;
