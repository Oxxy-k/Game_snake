import {
  growSnakeAndRecreateFood,
  boostSpeedOfSnakeAndRecreateFood,
  lowerSpeedOfSnakeAndRecreateFood,
  teleportSnakeToRandomAndRecreateFood,
  cutSnakeBodyAndRecreateFood,
  rebornSnakeAndFoodWithSaveScore,
  rebornSnakeAndFoodWithoutScore,
} from "./gameTickBigHelper";

const actionSnakeEatFood = (
  food,
  newSnake,
  initialGrid,
  snake,
  initialSnake
) => {
  switch (food.typeOfFood) {
    case "good":
      return growSnakeAndRecreateFood(newSnake, initialGrid, snake);
    case "high-speed":
      return boostSpeedOfSnakeAndRecreateFood(newSnake, initialGrid, snake);
    case "low-speed":
      return lowerSpeedOfSnakeAndRecreateFood(newSnake, initialGrid, snake);
    case "portal":
      return teleportSnakeToRandomAndRecreateFood(newSnake, initialGrid, snake);
    case "death":
      return snake.body.length === 1
        ? rebornSnakeAndFoodWithoutScore(initialGrid, initialSnake)
        : rebornSnakeAndFoodWithSaveScore(initialGrid, initialSnake, snake);
    case "bad":
      return snake.body.length === 1
        ? rebornSnakeAndFoodWithoutScore(initialGrid, initialSnake)
        : cutSnakeBodyAndRecreateFood(newSnake, initialGrid, snake);
    default:
      return null;
  }
};

export { actionSnakeEatFood };
