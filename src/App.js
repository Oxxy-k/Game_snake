import React, { useState } from "react";
import "./App.css";
import Highscore from "./components/Highscore";
import Menu from "./components/Menu";
import initialNavigateBar from "./const/initialNavigateBar";
import Snake from "./components/Snake";



const getSortHighscore = (arr) => {
  return arr
    .slice(0)
    .sort((prev, next) => next.score - prev.score)
    .slice(0, 10);
};

const App = () => {
  const [NavigateBar, setNavigateBar] = useState(initialNavigateBar);
  const [score, setScore] = useState([]);
  const onNewScore = (item) => {
    const newScore = getSortHighscore([...score, ...item]);
    setScore(newScore);
  };

  const isNavigatedOnMenu = () => {
    const newState = { ...NavigateBar, menu: !NavigateBar.menu };
    setNavigateBar(newState);
  };

  const isNavigatedOnScoreMenu = () => {
    const newState = {
      ...NavigateBar,
      highscoreMenu: !NavigateBar.highscoreMenu,
      menu: !NavigateBar.menu,
    };
    setNavigateBar(newState);
  };

  return NavigateBar.highscoreMenu === true ? (
    <div>
      <Highscore
        isNavigatedOnScoreMenu={isNavigatedOnScoreMenu}
        score={score}
      />
    </div>
  ) : NavigateBar.menu === true ? (
    <Menu
      isNavigatedOnMenu={isNavigatedOnMenu}
      isNavigatedOnScoreMenu={isNavigatedOnScoreMenu}
    />
  ) : (
    <Snake isNavigatedOnMenu={isNavigatedOnMenu} onNewScore={onNewScore} />
  );
};

export default App;
