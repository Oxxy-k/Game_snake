const getDirection = (pushKey, setSnake) => {
  switch (pushKey.key) {
    case "ArrowRight":
      setSnake((snake) => ({
        ...snake,
        direction: snake.direction === "left" ? "left" : "right",
      }));
      break;
    case "ArrowLeft":
      setSnake((snake) => ({
        ...snake,
        direction: snake.direction === "right" ? "right" : "left",
      }));
      break;
    case "ArrowUp":
      setSnake((snake) => ({
        ...snake,
        direction: snake.direction === "down" ? "down" : "up",
      }));
      break;
    case "ArrowDown":
      setSnake((snake) => ({
        ...snake,
        direction: snake.direction === "up" ? "up" : "down",
      }));
      break;
  }
};

export default getDirection;
