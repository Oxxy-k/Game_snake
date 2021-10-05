import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import renderGridItems from "../helper/renderGridItems";
import gameTick from "../helper/gameTick";
import changeDirection from "../helper/changeDirection";
import direction from "../const/direction";
import createFood from "../helper/createFood";
import calculateScore from "../helper/calculateScore";
import initialSnake from "../const/initialSnake";
import getCell from "../helper/getCell";

const initialGrid = {
  rows: 20,
  cols: 20,
  cell: getCell(),
};

const Snake = ({ onNewScore }) => {
  const initialFood = createFood(initialSnake, initialGrid);
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);

  useEffect(() => {
    const timer = setInterval(() => {
      setFood(createFood(snake, initialGrid));
    }, 7000);
    return () => clearInterval(timer);
  }, [food]);

  useEffect(() => {
    const timer = setInterval(() => {
      const { newSnake, newFood, newScore } = gameTick(
        initialSnake,
        snake,
        direction,
        initialGrid,
        food
      );
      if (newSnake) {
        setSnake(newSnake);
      }
      if (newFood) {
        setFood(newFood);
      }
      if (newScore) {
        onNewScore(newScore);
      }
    }, snake.speed);
    return () => clearInterval(timer);
  }, [snake, food, onNewScore]);

  useEffect(() => {
    const onKeyDown = (event) => setSnake(changeDirection(event, snake));
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [snake]);

  const gridItems = renderGridItems(initialGrid, snake, food);

  return (
    <div className="snake-container">
      <div>
        <Link to="/" className="snake-back-menu">
          {`<<`}Back to menu
        </Link>
      </div>
      <div className="grid">{gridItems}</div>
      <div className="score">SCORE:{calculateScore(snake)}</div>
    </div>
  );
};

export default Snake;
