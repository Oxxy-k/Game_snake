const getSortHighscore = (arr) => {
  return arr.sort((prev, next) => next.score - prev.score).slice(0, 10);
};

export default getSortHighscore;
