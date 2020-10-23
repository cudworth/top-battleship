const player = require('./player');

test('module returns an object', () => {
  expect(typeof player()).toBe('object');
});
