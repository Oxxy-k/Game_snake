import createFood from "./createFood";
import getTime from "./getTime";
import calculateScore from "./calculateScore";

const checkSnakeEatFood = (snake, food) => {
  return snake.rows === food.rows && snake.cols === food.cols;
};

const checkLoseSnake = (snake) => {
  return snake.body
    .slice(0, snake.body.length - 1)
    .find(({ rows, cols }) => rows === snake.rows && cols === snake.cols);
};

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

const gameTick = (
  initialSnake,
  snake,
  direction,
  initialGrid,
  food,
  onNewScore
) => {
  // let because the snake changes its state several times;
  let newSnake = snake;
  if (checkLoseSnake(snake)) {
    return {
      newFood: createFood(newSnake, initialGrid),
      newSnake: {
        ...initialSnake,
        score: [{ score: calculateScore(snake), date: getTime(new Date()) }],
      },
      newScore: newSnake.score,
    };
  } else {
    newSnake = onMoveSnakeHead(snake, direction, initialGrid);
    if (checkSnakeEatFood(newSnake, food)) {
      if (food.typeOfFood === "good") {
        return {
          newFood: createFood(newSnake, initialGrid),
          newSnake: {
            ...newSnake,
            body: [...snake.body, { rows: newSnake.rows, cols: newSnake.cols }],
          },
        };
      } else if (food.typeOfFood === "high-speed") {
        return {
          newFood: createFood(newSnake, initialGrid),
          newSnake: {
            ...newSnake,
            speed: snake.speed * 0.8,
            body: [
              ...snake.body.slice(1),
              { rows: newSnake.rows, cols: newSnake.cols },
            ],
          },
        };
      } else if (food.typeOfFood === "low-speed") {
        return {
          newFood: createFood(newSnake, initialGrid),
          newSnake: {
            ...newSnake,
            speed: snake.speed * 1.2,
            body: [
              ...snake.body.slice(1),
              { rows: newSnake.rows, cols: newSnake.cols },
            ],
          },
        };
      } else if (food.typeOfFood === "portal") {
        const randomCoord = createFood(newSnake, initialGrid);
        return {
          newFood: createFood(newSnake, initialGrid),
          newSnake: {
            ...newSnake,
            rows: randomCoord.rows,
            cols: randomCoord.cols,
            body: [
              ...snake.body.slice(1),
              { rows: newSnake.rows, cols: newSnake.cols },
            ],
          },
        };
      } else if (food.typeOfFood === "death") {
        if (snake.body.length === 1) {
          return {
            newFood: createFood(newSnake, initialGrid),
            newSnake: { ...initialSnake },
          };
        } else {
          return {
            newSnake: {
              ...initialSnake,
              score: [
                { score: calculateScore(snake), date: getTime(new Date()) },
              ],
            },
            newFood: createFood(newSnake, initialGrid),
            newScore: onNewScore(newSnake.score),
          };
        }
      } else if (food.typeOfFood === "bad") {
        if (snake.body.length === 1) {
          return {
            newSnake: { ...initialSnake },
            newFood: createFood(newSnake, initialGrid),
          };
        } else {
          return {
            newFood: createFood(newSnake, initialGrid),
            newSnake: {
              ...newSnake,
              body: [
                ...snake.body.slice(2),
                { rows: newSnake.rows, cols: newSnake.cols },
              ],
            },
          };
        }
      }
    } else {
      return {
        newSnake: {
          ...newSnake,
          body: [
            ...snake.body.slice(1),
            { rows: newSnake.rows, cols: newSnake.cols },
          ],
        },
      };
    }
  }
};

export default gameTick;
