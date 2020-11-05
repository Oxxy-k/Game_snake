const getRandomTypeOfFood = () => {
  const random = Math.random() * 20;
  if (random <= 10) {
    return "good";
  } else if (random <= 15) {
    return "bad";
  } else if (random <= 18) {
    return "portal";
  }
  return "death";
};

const getRandomFood = (Grid) => {
  return {
    typeOfFood: getRandomTypeOfFood(),
    rows: Math.floor(Math.random() * Grid.rows),
    cols: Math.floor(Math.random() * Grid.cols),
  };
};

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

