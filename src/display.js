function displayController() {
  const menu = document.getElementById('menu');
  const menuStatus = document.getElementById('menu-status');
  const pvpBtn = document.getElementById('pvpBtn');
  const pvcBtn = document.getElementById('pvcBtn');

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

  function showMenu(status, pvpCb, pvcCB) {
    menuStatus.innerHTML = status;
    menu.classList.add('menu');
    pvpBtn.addEventListener('click', () => {
      toggleClass('menu', 'hidden');
      pvpCb();
    });
    pvcBtn.addEventListener('click', () => {
      toggleClass('menu', 'hidden');
      pvcCB();
    });
  }

  function toggleClass(c1, c2) {
    if (menu.classList.contains(c1)) {
      menu.classList.remove(c1);
      menu.classList.add(c2);
    } else {
      menu.classList.remove(c2);
      menu.classList.add(c1);
    }
  }

  function pause() {
    clear();
  }

  function setStatus(status) {
    gameStatus.textContent = status;
  }

  function addAttackListener(attackHandler) {
    db2.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.addEventListener('click', () => attackHandler([r, c]));
      });
    });
  }

  return { render, pause, showMenu, addAttackListener };
}

export default displayController;
