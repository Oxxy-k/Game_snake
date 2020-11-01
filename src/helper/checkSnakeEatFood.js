const checkSnakeEatFood = (snake, food) => {
  return snake.rows === food.rows && snake.cols === food.cols;
};

export default checkSnakeEatFood;
