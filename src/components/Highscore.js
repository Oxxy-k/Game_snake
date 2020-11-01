import React from "react";

const Highscore = ({ isNavigatedOnScoreMenu, score }) => {
  const scoreResult =
    score.length === 0 ? (
      <div></div>
    ) : (
      score.map(({ score, date }) => {
        return (
          <div className="snake-back-menu">
            {`SCORE:` + score + `   DATE:` + date}
          </div>
        );
      })
    );
  return (
    <div className="App">
      <div className="highscore">
        <div
          className="snake-back-menu"
          onClick={() => {
            isNavigatedOnScoreMenu();
          }}
        >
          {`<<`}Back to menu
        </div>
        {scoreResult}
      </div>
    </div>
  );
};

export default Highscore;
