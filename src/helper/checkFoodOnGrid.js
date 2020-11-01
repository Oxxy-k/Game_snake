const checkFoodOnGrid = (food, grid) => {
  return food.rows === grid.row && food.cols === grid.col;
};

export default checkFoodOnGrid;
