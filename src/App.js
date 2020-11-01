import React, { useState, useEffect } from "react";
import "./App.css";
import direction from "./const/direction";
import getTime from "./helper/getTime";
import onMoveSnakeHead from "./helper/onMoveSnakeHead";
import Highscore from "./components/Highscore";
import Menu from "./components/Menu";
import initialNavigateBar from "./const/initialNavigateBar";
import initialSnake from "./const/initialSnake";
import getFood from "./helper/getFood";
import checkSnakeHeadOnGrid from "./helper/checkSnakeHeadOnGrid";
import checkSnakeBodyOnGrid from "./helper/checkSnakeBodyOnGrid";
import checkFoodOnGrid from "./helper/checkFoodOnGrid";
import checkLoseSnake from "./helper/checkLoseSnake";
import getSortHighscore from "./helper/getSortHighscore";
import checkSnakeEatFood from "./helper/checkSnakeEatFood";
import getScore from "./helper/getScore";
import onClose from "./helper/onClose";
//import gridItems from "./helper/gridItems";
// import initialGrid from "./const/initialSnake"; ???

const initialGrid = {
  rows: 20,
  cols: 20,
  grid: [],
  typeOfFood: null,
};

const initialFood = getFood(initialSnake, initialGrid);

const grid = [];
for (let row = 0; row < initialGrid.rows; row++) {
  for (let col = 0; col < initialGrid.cols; col++) {
    grid.push({ row, col });
  }
}

const Snake = ({ isNavigatedOnMenu, transferFromSnakeScore }) => {
  const setGrid = { ...initialGrid, grid: grid };
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);

  useEffect(() => {
    const timer = setInterval(() => {
      setFood(getFood(snake, initialGrid));
    }, 7000); // clearing interval
    return () => clearInterval(timer);
  }, [food]);

  useEffect(() => {
    const timer = setInterval(() => {
      // let because the snake changes its state several times;
      let newSnake;
      if (checkLoseSnake(snake)) {
        newSnake = {
          ...initialSnake,
          score: [{ score: getScore(snake), date: getTime(new Date()) }],
        };
        setFood(getFood(newSnake, initialGrid));
        transferFromSnakeScore(newSnake.score);
      }
      // continue game if snake isn`t lose
      else {
        newSnake = onMoveSnakeHead(snake, direction, initialGrid);
        if (checkSnakeEatFood(newSnake, food)) {
          if (food.typeOfFood === "good") {
            setFood(getFood(newSnake, initialGrid));
            newSnake = {
              ...newSnake,
              body: [
                ...snake.body,
                { rows: newSnake.rows, cols: newSnake.cols },
              ],
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
            newSnake = {
              ...initialSnake,
              score: [{ score: getScore(snake), date: getTime(new Date()) }],
            };
            setFood(getFood(newSnake, initialGrid));
            transferFromSnakeScore(newSnake.score);
          } else if (food.typeOfFood === "bad") {
            if (snake.body.length === 1) {
              newSnake = {
                ...initialSnake,
              };
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
    }, 100); // clearing interval
    return () => clearInterval(timer);
  }, [snake, food, transferFromSnakeScore]);

  useEffect(() => {
    const onKeyDown = (event) => {
      //change direction Snake
      switch (event.key) {
        case "ArrowRight":
          setSnake((Snake) => ({
            ...Snake,
            direction: Snake.direction === "left" ? "left" : "right",
          }));
          break;
        case "ArrowLeft":
          setSnake((Snake) => ({
            ...Snake,
            direction: Snake.direction === "right" ? "right" : "left",
          }));
          break;
        case "ArrowUp":
          setSnake((Snake) => ({
            ...Snake,
            direction: Snake.direction === "down" ? "down" : "up",
          }));
          break;
        case "ArrowDown":
          setSnake((Snake) => ({
            ...Snake,
            direction: Snake.direction === "up" ? "up" : "down",
          }));
          break;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const gridItems = setGrid.grid.map((grid) => {
    if (checkSnakeHeadOnGrid(snake, grid))
      return (
        <div
          key={grid.row.toString() + "-" + grid.col.toString()}
          className="grid-snake-head-container"
        ></div>
      );

    if (checkSnakeBodyOnGrid(snake, grid)) {
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
//<GridItems setGrid={setGrid} snake={snake} food={food}/>
const App = () => {
  const [state, setState] = useState(initialNavigateBar);
  const [score, setScore] = useState(initialSnake.score);
  const transferFromSnakeScore = (item) => {
    const newScore = getSortHighscore([...score, ...item]);
    setScore(newScore);
  };

  const isNavigatedOnMenu = () => {
    const newState = { ...state, menu: !state.menu };
    setState(newState);
  };

  const isNavigatedOnScoreMenu = () => {
    const newState = {
      ...state,
      highscoreMenu: !state.highscoreMenu,
      menu: !state.menu,
    };
    setState(newState);
  };

  return state.highscoreMenu === true ? (
    <div>
      <Highscore
        isNavigatedOnScoreMenu={isNavigatedOnScoreMenu}
        score={score}
      />
    </div>
  ) : state.menu === true ? (
    <Menu
      isNavigatedOnMenu={isNavigatedOnMenu}
      isNavigatedOnScoreMenu={isNavigatedOnScoreMenu}
      onClose={onClose}
    />
  ) : (
    <Snake
      isNavigatedOnMenu={isNavigatedOnMenu}
      transferFromSnakeScore={transferFromSnakeScore}
    />
  );
};

export default App;
