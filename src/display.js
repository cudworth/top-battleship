function displayController() {
  const domMenu = document.getElementById('menu');
  const menuStatus = document.getElementById('menu-status');
  const pvpBtn = document.getElementById('pvpBtn');
  const pvcBtn = document.getElementById('pvcBtn');
  const db1 = document.getElementById('p1-gameboard');
  const db2 = document.getElementById('p2-gameboard');

  const gameStatus = document.getElementById('game-status');

  function init(pvpCB, pvcCB) {
    pvpBtn.addEventListener('click', () => {
      toggleClass(domMenu, 'menu', 'hidden');
      pvpCB();
    });
    pvcBtn.addEventListener('click', () => {
      toggleClass(domMenu, 'menu', 'hidden');
      pvcCB();
    });
  }

  function render(gb1, gb2, status, attackHandler) {
    const activeDisplay = drawBoard(db1);
    const inactiveDisplay = drawBoard(db2);
    renderActive(gb1, activeDisplay);
    renderInactive(gb2, inactiveDisplay);
    addAttackListener(inactiveDisplay, attackHandler);
    setGameStatus(status);
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

  function menu(status) {
    menuStatus.innerHTML = `<h2>${status}</h2>`;
    toggleClass(domMenu, 'menu', 'hidden');
  }

  function toggleClass(n, c1, c2) {
    if (n.classList.contains(c1)) {
      n.classList.remove(c1);
      n.classList.add(c2);
    } else {
      n.classList.remove(c2);
      n.classList.add(c1);
    }
  }

  function setGameStatus(status) {
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
      'Attack missed the enemy ships, pass computer to your opponent and press any key to continue play.';
    div.classList.add('menu');
    document.body.append(div);

    document.addEventListener('keydown', play);

    function play() {
      document.body.removeChild(div);
      document.removeEventListener('keydown', play);
    }
  }

  return { init, render, clear, menu, changePlayer, setGameStatus };
}

export default displayController;
