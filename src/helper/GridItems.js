import React from "react";
import checkSnakeHeadOnGrid from "./helper/checkSnakeHeadOnGrid";
import checkSnakeBodyOnGrid from "./helper/checkSnakeBodyOnGrid";
import checkFoodOnGrid from "./helper/checkFoodOnGrid";
import "../App.css";

const GridItems = (setGrid, snake, food) => {
  setGrid.grid.map((grid) => {
    if (checkSnakeHeadOnGrid(snake, grid))
      return (
        <div
          key={grid.row.toString() + "-" + grid.col.toString()}
          className="grid-snake-container"
        ></div>
      );

    if (checkSnakeBodyOnGrid(snake, grid)) {
      return (
        <div
          key={grid.row.toString() + "-" + grid.col.toString()}
          className="grid-snake-container"
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
};

export default GridItems;
