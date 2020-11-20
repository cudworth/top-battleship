//CONTROLLER
import player from './player';
import npc from './npc';
import gameboard from './gameboard';
import display from './display';

function gameController(newGameCB) {
  const myDisplay = display(); //initialize display

  myDisplay.menu(
    '<h1>Play Battleship</h1><h2>Select a game mode:</h2>',
    () => create('pvp'),
    () => create('pvc')
  );

  function create(type) {
    const isPvp = type === 'pvp';

    const p1 = player();
    const p2 = isPvp ? player() : npc();

    const gb1 = gameboard();
    const gb2 = gameboard();

    placeShipsRandomly(gb1);
    placeShipsRandomly(gb2);

    const players = [p1, p2];
    const boards = [gb1, gb2];

    let active = Math.floor(2 * Math.random());

    const getActive = () => active;
    const getInactive = () => (active === 0 ? 1 : 0);
    const nextTurn = () => {
      active = getInactive();
    };

    function attackHandler(coords) {
      const result = boards[getInactive()].receiveAttack(coords);
      const gameLost = boards[getInactive()].allShipsSunk();

      if (gameLost) {
        const text = `${
          getActive() ? 'Second Player' : 'First Player'
        } is victorious.`;
        myDisplay.menu(
          text,
          () => create('pvp'),
          () => create('pvc')
        );
      } else {
        if (result === 'hit') {
          if (!isPvp && getActive()) {
            attackHandler(p2.randomAttack());
          } else {
            render();
          }
        } else if (result === 'miss' && isPvp) {
          myDisplay.clear();
          nextTurn();
          window.setTimeout(() => {
            render();
          }, 2000);
        } else if (result === 'miss' && !isPvp) {
          nextTurn();
          render();
          if (getActive()) {
            attackHandler(p2.randomAttack());
          } else {
            render();
          }
        }
      }
    }

    function render() {
      const statusText = `${
        getActive() ? 'First player' : 'Second player'
      } to attack.`;
      myDisplay.render(
        boards[getActive()].getBoard(),
        boards[getInactive()].getBoard(),
        statusText,
        !isPvp && getActive() ? () => {} : attackHandler
      );
    }

    if (getActive() && !isPvp) {
      attackHandler(p2.randomAttack());
    }
    render();
  }
}

function placeShipsRandomly(board) {
  const dirs = [0, 90, 180, 270];
  const locs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const lengths = [5, 4, 3, 2, 1];
  const rnd = getRandomFromArray;
  lengths.forEach((len) => {
    let success = false;
    while (success === false) {
      const guess = [rnd(locs), rnd(locs), rnd(dirs), len];
      success = board.placeShip(guess);
    }
  });
}

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default gameController;
