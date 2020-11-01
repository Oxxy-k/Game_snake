import months from "../const/months";

const getTime = (isoTime) => {
  const time = new Date(isoTime);
  return `${time.getHours()}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${time.getDate()} ${months[time.getMonth()]}`;
};

export default getTime;
