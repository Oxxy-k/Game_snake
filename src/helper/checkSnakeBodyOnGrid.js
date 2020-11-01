const checkSnakeBodyOnGrid = (snake, grid) => {
  return snake.body.find(
    ({ rows, cols }) => grid.row === rows && grid.col === cols
  );
};

export default checkSnakeBodyOnGrid;
