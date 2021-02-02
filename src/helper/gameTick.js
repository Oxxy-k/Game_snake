import { checkSnakeEatFood, checkLoseSnake } from "./checkMoveSnake";
import { moveSnakeHead, moveTailOfSnake } from "./gameTickBigHelper";
import { actionSnakeEatFood } from "./actionSnakeEatFood";
import { rebornSnakeAndFoodWithSaveScore } from "./gameTickBigHelper";

const gameTick = (initialSnake, snake, direction, initialGrid, food) => {
  if (checkLoseSnake(snake)) {
    return rebornSnakeAndFoodWithSaveScore(initialGrid, initialSnake, snake);
  }
  const newSnake = moveSnakeHead(snake, direction, initialGrid);
  if (checkSnakeEatFood(newSnake, food)) {
    return actionSnakeEatFood(food, newSnake, initialGrid, snake, initialSnake);
  }
  return moveTailOfSnake(newSnake, snake);
};

export default gameTick;
