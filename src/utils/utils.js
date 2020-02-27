export const getTextRating = (value) => {
  if (value >= 0 && value < 3) {
    return `Bad`;
  } else if (value >= 3 && value < 5) {
    return `Normal`;
  } else if (value >= 5 && value < 8) {
    return `Good`;
  } else if (value >= 8 && value <= 10) {
    return `Very good`;
  }

  return ``;
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const toHHMMSS = (time) => {
  const parsedSeconds = parseInt(time, 10);
  let hours = Math.floor(parsedSeconds / 3600);
  let minutes = Math.floor((parsedSeconds - hours * 3600) / 60);
  let seconds = parsedSeconds - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};
