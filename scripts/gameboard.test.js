const gameBoard = require('./gameboard');

test('module returns an object', () => {
  const myGameBoard = gameboard();
  expect(typeof myGameBoard).toBe('object');
});

test('module has required methods', () => {
  const myGameBoard = gameboard();
  expect(myGameBoard.place).toBeDefined();
  expect(myGameBoard.receiveAttack).toBeDefined();
  expect(myGameBoard.place).toBeDefined();
  expect(myGameBoard.place).toBeDefined();
  expect(myGameBoard.place).toBeDefined();
});
