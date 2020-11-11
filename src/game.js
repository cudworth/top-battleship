//CONTROLLER
import player from './player';
import npc from './npc';
import gameboard from './gameboard';
import display from './display';

function gameController(newGameCB) {
  const p1 = npc();
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

  const myDisplay = display(attackHandler); //create display for gameboards
  render(); //display game
  //myDisplay.gameEnd('Hey there!', () => newGameCB());

  /*
  window.setInterval(() => {
    const coords = players[getActive()].randomAttack();
    attackHandler(coords);
  }, 50);
  */

  function attackHandler(coords) {
    const result = boards[getInactive()].receiveAttack(coords);
    const gameLost = boards[getInactive()].allShipsSunk();
    console.log(`All ships sunk? ${gameLost}`);
    if (result === 'miss') {
      nextTurn();
      myDisplay.pause();
    }
    render();

    if (gameLost) {
      const text = `${
        getActive() ? 'Second Player' : 'First Player'
      } is victorious.`;
      myDisplay.gameEnd(text, newGameCB);
    }
  }

  function render() {
    const status = `${
      getActive() ? 'First player' : 'Second player'
    } to attack.`;
    myDisplay.render(
      boards[getActive()].getBoard(),
      boards[getInactive()].getBoard(),
      status
    );
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
