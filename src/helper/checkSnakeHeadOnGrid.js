const checkSnakeHeadOnGrid = (snake, grid) => {
  return snake.rows === grid.row && snake.cols === grid.col;
};

export default checkSnakeHeadOnGrid;
