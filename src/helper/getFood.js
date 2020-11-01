import getRandomFood from "./getRandomFood";

const getFood = (newSnake, initialGrid) => {
  let newFood = {};
  do {
    newFood = getRandomFood(initialGrid);
  } while (
    newSnake.body.find(
      ({ rows, cols }) => rows === newFood.rows && cols === newFood.cols
    )
  );
  return newFood;
};

export default getFood;
