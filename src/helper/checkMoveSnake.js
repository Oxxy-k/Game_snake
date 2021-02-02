const checkSnakeEatFood = (snake, food) => {
  return snake.rows === food.rows && snake.cols === food.cols;
};

const checkLoseSnake = (snake) => {
  return snake.body
    .slice(0, snake.body.length - 1)
    .find(({ rows, cols }) => rows === snake.rows && cols === snake.cols);
};

export { checkSnakeEatFood, checkLoseSnake };
