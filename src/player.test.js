//const player = require('./player');

test('module returns an object', () => {
  expect(typeof player()).toBe('object');
});

/*
test('module has required methods', () => {
  expect(player().gameBoard).toBeDefined();
  expect(player().attack).toBeDefined();
  expect(player().hasLost).toBeDefined();
});
*/

/*
Create Player.

    players can take turns playing the game by
    attacking the enemy Gameboard.
    The game is played against the computer,
    so make ‘computer’ players capable of
    making random plays. The AI does not have
    to be smart, but it should know whether or
    not a given move is legal. (i.e. it
    shouldn’t shoot the same coordinate twice).
*/

/*
player has a gameboard object
player makes attacks
player receives attacks and reports loss condition after receiving attacks
IF computer player, get rand coordinates, check against past plays

*/
