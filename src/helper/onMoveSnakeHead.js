const onMoveSnakeHead = (snake, direction, initialGrid) => {
  return {
    ...snake,
    rows:
      (snake.rows + direction[snake.direction].rows + initialGrid.rows) %
      initialGrid.rows,
    cols:
      (snake.cols + direction[snake.direction].cols + initialGrid.cols) %
      initialGrid.cols,
  };
};
export default onMoveSnakeHead;
