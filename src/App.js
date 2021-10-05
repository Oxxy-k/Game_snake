import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Highscore from "./components/Highscore";
import Menu from "./components/Menu";
import Snake from "./components/Snake";

const getSortHighscore = (arr) => {
  return arr
    .slice(0)
    .sort((prev, next) => next.score - prev.score)
    .slice(0, 10);
};

const App = () => {
  const [score, setScore] = useState([]);
  const onNewScore = (item) => {
    const newScore = getSortHighscore([...score, ...item]);
    setScore(newScore);
    localStorage.setItem("highscore", JSON.stringify(newScore));
  };

  useEffect(() => {
    const highscore = JSON.parse(localStorage.getItem("highscore"));
    setScore(highscore);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
        <Route path="/game">
          <Snake onNewScore={onNewScore} />
        </Route>
        <Route path="/highscore">
          <Highscore score={score} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
