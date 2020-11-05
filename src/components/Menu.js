import React from "react";

const onClose = () => {
  window.close();
};

const Menu = ({ isNavigatedOnMenu, isNavigatedOnScoreMenu }) => {
  return (
    <div className="App">
      <div className="BlockMenu">
        <h1
          className="MenuTitle"
          onClick={() => {
            isNavigatedOnMenu();
          }}
        >
          new game
        </h1>
        <h1
          className="MenuTitle"
          onClick={() => {
            isNavigatedOnScoreMenu();
          }}
        >
          highscore
        </h1>
        <h1
          className="MenuTitle"
          onClick={() => {
            onClose();
          }}
        >
          exit
        </h1>
      </div>
    </div>
  );
};

export default Menu;
