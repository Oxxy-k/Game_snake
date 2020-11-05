import React, { useState, useEffect } from "react";
import setGridItems from "../helper/setGridItems";
import isSnakeMove from "../helper/isSnakeMove";
import getDirection from "../helper/getDirection";
import direction from "../const/direction";
import getFood from "../helper/getFood";
import getScore from "../helper/getScore";
import initialSnake from "../const/initialSnake";

const initialGrid = {
  rows: 20,
  cols: 20,
  grid: [],
  typeOfFood: null,
};

const grid = [];
for (let row = 0; row < initialGrid.rows; row++) {
  for (let col = 0; col < initialGrid.cols; col++) {
    grid.push({ row, col });
  }
}

const Snake = ({ isNavigatedOnMenu, transferFromSnakeScore }) => {
  const initialFood = getFood(initialSnake, initialGrid);
  const setGrid = { ...initialGrid, grid: grid };
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);

  useEffect(() => {
    const timer = setInterval(() => {
      setFood(getFood(snake, initialGrid));
    }, 7000);
    return () => clearInterval(timer);
  }, [food]);

  useEffect(() => {
    const timer = setInterval(() => {
      isSnakeMove(
        initialSnake,
        snake,
        setSnake,
        direction,
        initialGrid,
        food,
        setFood,
        transferFromSnakeScore
      );
    }, 100);
    return () => clearInterval(timer);
  }, [snake, food, transferFromSnakeScore]);

  useEffect(() => {
    const onKeyDown = (event) => getDirection(event, setSnake);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const gridItems = setGridItems(setGrid, snake, food);

  return (
    <div className="snake-container">
      <div>
        <p className="snake-back-menu" onClick={() => isNavigatedOnMenu()}>
          {`<<`}Back to menu
        </p>
      </div>
      <div className="grid">{gridItems}</div>
      <div className="score">SCORE:{getScore(snake)}</div>
    </div>
  );
};

export default Snake;
