import getFood from "./getFood";
import getTime from "./getTime";
import getScore from "./getScore";

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

const isSnakeMove = (
  initialSnake,
  snake,
  setSnake,
  direction,
  initialGrid,
  food,
  setFood,
  transferFromSnakeScore
) => {
  // let because the snake changes its state several times;
  let newSnake;
  if (checkLoseSnake(snake)) {
    newSnake = {
      ...initialSnake,
      score: [{ score: getScore(snake), date: getTime(new Date()) }],
    };
    setFood(getFood(newSnake, initialGrid));
    transferFromSnakeScore(newSnake.score);
  } else {
    newSnake = onMoveSnakeHead(snake, direction, initialGrid);
    if (checkSnakeEatFood(newSnake, food)) {
      if (food.typeOfFood === "good") {
        setFood(getFood(newSnake, initialGrid));
        newSnake = {
          ...newSnake,
          body: [...snake.body, { rows: newSnake.rows, cols: newSnake.cols }],
        };
      } else if (food.typeOfFood === "portal") {
        setFood(getFood(newSnake, initialGrid));
        const randomCoord = getFood(newSnake, initialGrid);
        newSnake = {
          ...newSnake,
          rows: randomCoord.rows,
          cols: randomCoord.cols,
          body: [
            ...snake.body.slice(1),
            { rows: newSnake.rows, cols: newSnake.cols },
          ],
        };
      } else if (food.typeOfFood === "death") {
        if (snake.body.length === 1) {
          newSnake = { ...initialSnake };
          setFood(getFood(newSnake, initialGrid));
        } else {
          newSnake = {
            ...initialSnake,
            score: [{ score: getScore(snake), date: getTime(new Date()) }],
          };
          setFood(getFood(newSnake, initialGrid));
          transferFromSnakeScore(newSnake.score);
        }
      } else if (food.typeOfFood === "bad") {
        if (snake.body.length === 1) {
          newSnake = { ...initialSnake };
          setFood(getFood(newSnake, initialGrid));
        } else {
          setFood(getFood(newSnake, initialGrid));
          newSnake = {
            ...newSnake,
            body: [
              ...snake.body.slice(2),
              { rows: newSnake.rows, cols: newSnake.cols },
            ],
          };
        }
      }
    } else {
      newSnake = {
        ...newSnake,
        body: [
          ...snake.body.slice(1),
          { rows: newSnake.rows, cols: newSnake.cols },
        ],
      };
    }
  }
  setSnake(newSnake);
};

export default isSnakeMove;
