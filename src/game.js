import player from './player';
import gameboard from './gameboard';

function create() {
  const p1 = player();
  const p2 = player();
  const gb1 = gameboard();
  const gb2 = gameboard();

  placeShipsRandomly(gb1);
  placeShipsRandomly(gb2);

  let myTurn = true;

  window.setInterval(() => {
    if (!myTurn) {
      const result = gb1.receiveAttack(p2.randomAttack());
      if (result === 'miss') {
        myTurn = !myTurn;
      }
    }
  }, 500);

  const game = {
    gb1,
    gb2,
    isMyTurn: () => myTurn,
    nextTurn: () => (myTurn = !myTurn),
  };
  return game;
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

export default { create };
