function npc() {
  const attackLog = [];
  const attacks = [];
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      attacks.push([r, c]);
    }
  }

  function randomAttack() {
    const coords = attacks.splice(
      Math.floor(Math.random() * attacks.length),
      1
    )[0];
    attackLog.push(coords);
    return coords;
  }

  return { randomAttack };
}

export default npc;
