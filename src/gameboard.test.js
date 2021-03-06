const gameBoard = require('./gameboard');

test('module returns an object', () => {
  const myGameBoard = gameBoard();
  expect(typeof myGameBoard).toBe('object');
});

test('module has required methods', () => {
  const myGameBoard = gameBoard();
  expect(myGameBoard.placeShip).toBeDefined();
  expect(myGameBoard.receiveAttack).toBeDefined();
  expect(myGameBoard.getBoard).toBeDefined();
  expect(myGameBoard.allShipsSunk).toBeDefined();
});

test('module creates a new game board', () => {
  const myGameBoard = gameBoard();
  expect(Array.isArray(myGameBoard.getBoard())).toBe(true);
  expect(Array.isArray(myGameBoard.getBoard()[4])).toBe(true);
  expect(myGameBoard.getBoard().length).toBe(10);
  expect(myGameBoard.getBoard()[4].length).toBe(10);
});

test('can place ships onto gameboard in format r, c, dir, len', () => {
  expect(gameBoard().placeShip([0, 0, 0, 4])).toBe(true);
  expect(gameBoard().placeShip([0, 0, 90, 4])).toBe(false);
  expect(gameBoard().placeShip([0, 0, 180, 4])).toBe(false);
  expect(gameBoard().placeShip([0, 0, 270, 4])).toBe(true);
  expect(gameBoard().placeShip([0, 30, 0, 4])).toBe(false);
  const persistentGameboard = gameBoard();
  persistentGameboard.placeShip([0, 0, 0, 3]);
  expect(persistentGameboard.placeShip([0, 2, 270, 3])).toBe(false);
  expect(persistentGameboard.placeShip([0, 5, 270, 3])).toBe(true);
});

test('can receive attacks', () => {
  const myGameBoard = gameBoard();
  myGameBoard.placeShip([0, 0, 0, 4]);
  expect(myGameBoard.receiveAttack([0, 0])).toBe('hit');
  expect(myGameBoard.receiveAttack([0, 3])).toBe('hit');
  expect(myGameBoard.receiveAttack([1, 3])).toBe('miss');
});

test('can report all ships sunk', () => {
  const myGameBoard = gameBoard();
  myGameBoard.placeShip([0, 0, 0, 2]);
  expect(myGameBoard.allShipsSunk()).toBe(false);
  myGameBoard.receiveAttack([0, 0]);
  myGameBoard.receiveAttack([0, 1]);
  expect(myGameBoard.allShipsSunk()).toBe(true);
});
