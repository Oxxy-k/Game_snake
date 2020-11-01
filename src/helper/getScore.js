const getScore = (snake) => {
  return Math.max(0, (snake.body.length - 1) * 10)
    .toString()
    .padStart(5, 0);
};

export default getScore;
