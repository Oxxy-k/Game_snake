import React from "react";

const checkFoodOnGrid = (food, grid) => {
  return food.rows === grid.row && food.cols === grid.col;
};

const checkSnakeHeadOnGrid = (snake, grid) => {
  return snake.rows === grid.row && snake.cols === grid.col;
};

const checkSnakeBodyOnGrid = (snake, grid) => {
  return snake.body.find(
    ({ rows, cols }) => grid.row === rows && grid.col === cols
  );
};

const setGridItems = (setGrid, snake, food) =>
  setGrid.grid.map((grid) => {
    if (checkSnakeHeadOnGrid(snake, grid)) {
      return (
        <div
          key={grid.row.toString() + "-" + grid.col.toString()}
          className="grid-snake-head-container"
        ></div>
      );
    } else if (checkSnakeBodyOnGrid(snake, grid)) {
      return (
        <div
          key={grid.row.toString() + "-" + grid.col.toString()}
          className="grid-snake-body-container"
        ></div>
      );
    } else if (checkFoodOnGrid(food, grid))
      if (food.typeOfFood === "good") {
        return (
          <div
            className="grid-good-food"
            key={grid.row.toString() + "-" + grid.col.toString()}
          ></div>
        );
      } else if (food.typeOfFood === "portal") {
        return (
          <div
            className="grid-portal-food"
            key={grid.row.toString() + "-" + grid.col.toString()}
          ></div>
        );
      } else if (food.typeOfFood === "bad") {
        return (
          <div
            className="grid-bad-food"
            key={grid.row.toString() + "-" + grid.col.toString()}
          ></div>
        );
      } else if (food.typeOfFood === "death") {
        return (
          <div
            className="grid-death-food"
            key={grid.row.toString() + "-" + grid.col.toString()}
          ></div>
        );
      }
    return (
      <div
        key={grid.row.toString() + "-" + grid.col.toString()}
        className="grid-container"
      ></div>
    );
  });
export default setGridItems;
