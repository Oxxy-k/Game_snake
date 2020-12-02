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
    } else if (checkFoodOnGrid(food, cell))
      if (food.typeOfFood === "good") {
        return (
          <div
            className="grid-good-food"
            key={cell.row.toString() + "-" + cell.col.toString()}
          ></div>
        );
      } else if (food.typeOfFood === "high-speed") {
        return (
          <div
            className="grid-high-speed-food"
            key={cell.row.toString() + "-" + cell.col.toString()}
          ></div>
        );
      } else if (food.typeOfFood === "low-speed") {
        return (
          <div
            className="grid-low-speed-food"
            key={cell.row.toString() + "-" + cell.col.toString()}
          ></div>
        );
      } else if (food.typeOfFood === "portal") {
        return (
          <div
            className="grid-portal-food"
            key={cell.row.toString() + "-" + cell.col.toString()}
          ></div>
        );
      } else if (food.typeOfFood === "bad") {
        return (
          <div
            className="grid-bad-food"
            key={cell.row.toString() + "-" + cell.col.toString()}
          ></div>
        );
      } else if (food.typeOfFood === "death") {
        return (
          <div
            className="grid-death-food"
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
