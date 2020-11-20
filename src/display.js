function displayController() {
  const domMenu = document.getElementById('menu');
  const menuStatus = document.getElementById('menu-status');
  const pvpBtn = document.getElementById('pvpBtn');
  const pvcBtn = document.getElementById('pvcBtn');
  const db1 = document.getElementById('p1-gameboard');
  const db2 = document.getElementById('p2-gameboard');

  const gameStatus = document.getElementById('game-status');

  function render(gb1, gb2, status, attackHandler) {
    const activeDisplay = drawBoard(db1);
    const inactiveDisplay = drawBoard(db2);
    renderActive(gb1, activeDisplay);
    renderInactive(gb2, inactiveDisplay);
    addAttackListener(inactiveDisplay, attackHandler);
    setStatus(status);
  }

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

  function menu(status, pvpCb, pvcCB) {
    menuStatus.innerHTML = status;
    //domMenu.classList.add('menu');
    toggleClass('menu', 'hidden');
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
    if (domMenu.classList.contains(c1)) {
      domMenu.classList.remove(c1);
      domMenu.classList.add(c2);
    } else {
      domMenu.classList.remove(c2);
      domMenu.classList.add(c1);
    }
  }

  function setStatus(status) {
    gameStatus.textContent = status;
  }

  function addAttackListener(displayBoard, attackHandler) {
    displayBoard.forEach((row, r) => {
      row.forEach((cell, c) => {
        cell.addEventListener('click', () => attackHandler([r, c]));
      });
    });
  }

  function clear() {
    db1.innerHTML = '';
    db2.innerHTML = '';
  }

  function changePlayer() {
    const div = document.createElement('div');
    div.textContent =
      'Your attack missed, pass computer to your opponent and press any key to continue play.';
    div.classList.add('menu');
    document.body.append(div);

    document.addEventListener('keydown', play);

    function play() {
      document.body.removeChild(div);
      document.removeEventListener('keydown', play);
    }
  }

  return { render, clear, menu, changePlayer };
}

export default displayController;
