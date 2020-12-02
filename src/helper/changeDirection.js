const changeDirection = (pushKey, snake) => {
  switch (pushKey.key) {
    case "ArrowRight":
      return {
        ...snake,
        direction: snake.direction === "left" ? "left" : "right",
      };
    case "ArrowLeft":
      return {
        ...snake,
        direction: snake.direction === "right" ? "right" : "left",
      };

    case "ArrowUp":
      return {
        ...snake,
        direction: snake.direction === "down" ? "down" : "up",
      };

    case "ArrowDown":
      return {
        ...snake,
        direction: snake.direction === "up" ? "up" : "down",
      };
    default:
      return { ...snake };
  }
};

export default changeDirection;
