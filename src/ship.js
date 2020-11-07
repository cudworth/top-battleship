function ship(length) {
  const hits = [...Array(length).fill(false)];

  return {
    hit: (i) => {
      if (0 <= i && i < hits.length) {
        hits[i] = true;
        return true;
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

//module.exports = ship;
export default ship;
