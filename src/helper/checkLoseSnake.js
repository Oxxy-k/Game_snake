const checkLoseSnake = (snake) => {
  return snake.body
    .slice(0, snake.body.length - 1)
    .find(({ rows, cols }) => rows === snake.rows && cols === snake.cols);
};

export default checkLoseSnake;
