//CONTROLLER
import player from './player';
import npc from './npc';
import gameboard from './gameboard';
import display from './display';

function gameController() {
  const p1 = player();
  const p2 = npc();

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

  const myDisplay = display(); //create display for gameboards
  const status = `${getActive() ? 'First player' : 'Second player'} to attack.`;
  myDisplay.render(
    boards[getActive()].getBoard(),
    boards[getInactive()].getBoard(),
    status,
    'cbFn'
  ); //PASS gameboards, player status, and callbacks for receiving attacks

  /*
  window.setInterval(() => {
    if (active === 1) {
      const result = gb1.receiveAttack(p2.randomAttack());
      if (result === 'miss') {
        console.log('attack missed');
        nextTurn();
      }
    }
  }, 500);
  */
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
