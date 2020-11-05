import React, { useState } from "react";
import "./App.css";
import Highscore from "./components/Highscore";
import Menu from "./components/Menu";
import initialNavigateBar from "./const/initialNavigateBar";
import Snake from "./components/Snake";

const getSortHighscore = (arr) => {
  return arr.sort((prev, next) => next.score - prev.score).slice(0, 10);
};

const App = () => {
  const [state, setState] = useState(initialNavigateBar);
  const [score, setScore] = useState([]);
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
    />
  ) : (
    <Snake
      isNavigatedOnMenu={isNavigatedOnMenu}
      transferFromSnakeScore={transferFromSnakeScore}
    />
  );
};

export default App;
