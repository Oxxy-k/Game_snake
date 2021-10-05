import React from "react";

const checkFoodOnGrid = (food, cell) => {
  return food.rows === cell.row && food.cols === cell.col;
};

const checkSnakeHeadOnGrid = (snake, cell) => {
  return snake.rows === cell.row && snake.cols === cell.col;
};

const checkSnakeBodyOnGrid = (snake, cell) => {
  return snake.body.find(
    ({ rows, cols }) => cell.row === rows && cell.col === cols
  );
};
const renderGridItems = (setGrid, snake, food) =>
  setGrid.cell.map((cell) => {
    if (checkSnakeHeadOnGrid(snake, cell)) {
      return (
        <div
          key={cell.row.toString() + "-" + cell.col.toString()}
          className="grid-snake-head-container"
        ></div>
      );
    } else if (checkSnakeBodyOnGrid(snake, cell)) {
      return (
        <div
          key={cell.row.toString() + "-" + cell.col.toString()}
          className="grid-snake-body-container"
        ></div>
      );
    } else if (checkFoodOnGrid(food, cell)) {
      return (
        <div
          className={`grid-${food.typeOfFood}-food`}
          key={cell.row.toString() + "-" + cell.col.toString()}
        ></div>
      );
    }

    return (
      <div
        key={cell.row.toString() + "-" + cell.col.toString()}
        className="grid-container"
      ></div>
    );
  });
export default renderGridItems;
