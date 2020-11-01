import getRandomTypeOfFood from "./getRandomTypeOfFood";

const getRandomFood = (initialGrid) => {
  return {
    typeOfFood: getRandomTypeOfFood(),
    rows: Math.floor(Math.random() * initialGrid.rows),
    cols: Math.floor(Math.random() * initialGrid.cols),
  };
};

export default getRandomFood;
