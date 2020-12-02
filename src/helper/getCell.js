const getCell = () => {
  const cell = [];
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 20; col++) {
      cell.push({ row, col });
    }
  }
  return cell;
};

export default getCell;
