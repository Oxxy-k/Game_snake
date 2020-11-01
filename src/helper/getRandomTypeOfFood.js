const getRandomTypeOfFood = () => {
  const random = Math.random() * 20;
  if (random <= 10) {
    return "good";
  } else if (random <= 15) {
    return "bad";
  } else if (random <= 18) {
    return "portal";
  } else {
    return "death";
  }
};

export default getRandomTypeOfFood;
