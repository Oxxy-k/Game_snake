const createRandomTypeOfFood = () => {
  const random = Math.random() * 100;
  if (random <= 40) {
    return "good";
  } else if (random <= 55) {
    return "bad";
  } else if (random <= 70) {
    return "portal";
  } else if (random <= 80) {
    return "high-speed";
  } else if (random <= 90) {
    return "low-speed";
  }
  return "death";
};

const createRandomCoordinatesFood = (Grid) => {
  return {
    typeOfFood: createRandomTypeOfFood(),
    rows: Math.floor(Math.random() * Grid.rows),
    cols: Math.floor(Math.random() * Grid.cols),
  };
};

const createFood = (newSnake, initialGrid) => {
  let newFood = {};
  do {
    newFood = createRandomCoordinatesFood(initialGrid);
  } while (
    newSnake.body.find(
      ({ rows, cols }) => rows === newFood.rows && cols === newFood.cols
    )
  );
  return newFood;
};

export default createFood;
