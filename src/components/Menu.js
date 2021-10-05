import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="App">
      <div className="BlockMenu">
        <Link to="/game" className="link">
          <h1 className="MenuTitle">new game</h1>
        </Link>
        <Link to="/highscore" className="link">
          <h1 className="MenuTitle">highscore</h1>
        </Link>
        <h1
          className="MenuTitle"
          onClick={() => {
            window.close();
          }}
        >
          exit
        </h1>
      </div>
    </div>
  );
};

export default Menu;
