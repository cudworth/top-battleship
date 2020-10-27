const ship = require('./ship');

test('module returns an object', () => {
  const myShip = ship(4);
  expect(typeof myShip).toBe('object');
});

test('module has required methods', () => {
  const myShip = ship(4);
  expect(myShip.hit).toBeDefined();
  expect(myShip.isSunk).toBeDefined();
  expect(myShip.length).toBeDefined();
});

test('has property length', () => {
  const myShip = ship(4);
  expect(myShip.length()).toBe(4);
});

test('registers hits accurately', () => {
  const myShip = ship(4);
  expect(myShip.hit(3)).toBe(3);
  expect(myShip.hit(2)).toBe(2);
  expect(myShip.hit(-9)).toBe(false);
  expect(myShip.hit(4)).toBe(false);
});

test('check sunk status', () => {
  const myShip = ship(4);
  expect(myShip.isSunk()).toBe(false);
  myShip.hit(1);
  myShip.hit(3);
  expect(myShip.isSunk()).toBe(false);
  myShip.hit(0);
  myShip.hit(2);
  expect(myShip.isSunk()).toBe(true);
});
