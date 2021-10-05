import React from "react";
import { Link } from "react-router-dom";

const Highscore = ({ score }) => {
  const scoreResult =
    score.length > 0 &&
    score.map(({ score, date }) => {
      return (
        <div className="snake-back-menu" key={score + "" + date}>
          {`SCORE:` + score + `   DATE:` + date}
        </div>
      );
    });
  return (
    <div className="App">
      <div className="highscore">
        <Link to="/" className="snake-back-menu">
          {`<<`}Back to menu
        </Link>
        {scoreResult}
      </div>
    </div>
  );
};

export default Highscore;
