import createFood from "./createFood";
import getTime from "./getTime";
import calculateScore from "./calculateScore";

const moveSnakeHead = (snake, direction, initialGrid) => {
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

const moveTailOfSnake = (newSnake, snake) => {
  return {
    newSnake: {
      ...newSnake,
      body: [
        ...snake.body.slice(1),
        { rows: newSnake.rows, cols: newSnake.cols },
      ],
    },
  };
};

const growSnakeAndRecreateFood = (newSnake, initialGrid, snake) => {
  return {
    newFood: createFood(newSnake, initialGrid),
    newSnake: {
      ...newSnake,
      body: [...snake.body, { rows: newSnake.rows, cols: newSnake.cols }],
    },
  };
};

const boostSpeedOfSnakeAndRecreateFood = (newSnake, initialGrid, snake) => {
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
};

const lowerSpeedOfSnakeAndRecreateFood = (newSnake, initialGrid, snake) => {
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
};

const teleportSnakeToRandomAndRecreateFood = (newSnake, initialGrid, snake) => {
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
};

const cutSnakeBodyAndRecreateFood = (newSnake, initialGrid, snake) => {
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
};

const rebornSnakeAndFoodWithoutScore = (initialGrid, initialSnake) => {
  return {
    newFood: createFood(initialSnake, initialGrid),
    newSnake: { ...initialSnake },
  };
};

const rebornSnakeAndFoodWithSaveScore = (initialGrid, initialSnake, snake) => {
  return {
    newFood: createFood(snake, initialGrid),
    newSnake: {
      ...initialSnake,
    },
    newScore: [{ score: calculateScore(snake), date: getTime(new Date()) }],
  };
};

export {
  moveSnakeHead,
  moveTailOfSnake,
  growSnakeAndRecreateFood,
  boostSpeedOfSnakeAndRecreateFood,
  lowerSpeedOfSnakeAndRecreateFood,
  teleportSnakeToRandomAndRecreateFood,
  cutSnakeBodyAndRecreateFood,
  rebornSnakeAndFoodWithSaveScore,
  rebornSnakeAndFoodWithoutScore,
};
