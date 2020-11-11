function displayController(attackHandler) {
  const db1 = drawBoard(document.getElementById('p1-gameboard'));
  const db2 = drawBoard(document.getElementById('p2-gameboard'));
  addAttackListener(db2, attackHandler);
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
    clear();
    renderActive(gb1, db1);
    renderInactive(gb2, db2);
    setStatus(status);
  }

  function renderActive(gameBoard, displayBoard) {
    gameBoard.forEach((row, r) => {
      row.forEach((cell, c) => {
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
        if (cell.attacked === 'hit') {
          displayBoard[r][c].classList.add('hit');
        } else if (cell.attacked === 'miss') {
          displayBoard[r][c].classList.add('miss');
        }
      });
    });
  }

  function clear() {
    [db1, db2].forEach((displayBoard) => {
      displayBoard.forEach((row) => {
        row.forEach((cell) => {
          cell.classList.remove('ship', 'hit', 'miss');
        });
      });
    });
  }

  function gameEnd(text, cb) {
    clear();
    const parent = document.body;
    const notifier = document.createElement('div');
    parent.append(notifier);
    notifier.className = 'notifier';
    notifier.textContent = text;
    const newGameBtn = document.createElement('button');
    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', () => {
      parent.removeChild(notifier);
      cb();
    });
    notifier.append(newGameBtn);
  }

  function pause() {
    clear();
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

  return { render, pause, gameEnd };
}

export default displayController;
