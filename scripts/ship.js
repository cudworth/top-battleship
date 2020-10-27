function ship(length) {
  const hits = [...Array(length).fill(false)];

  return {
    hit: (i) => {
      if (0 <= i && i < hits.length) {
        hits[i] = true;
        return i;
      } else {
        return false;
      }
    },
    isSunk: () => {
      return hits.includes(false) ? false : true;
    },
    length: () => hits.length,
  };
}

module.exports = ship;
