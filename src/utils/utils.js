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

export const formatTime = (time) =>
  [60, 60, 24]
    .map((n) => {
      const result = time % n;
      time = (time - result) / n;
      return (`0` + result).slice(-2);
    })
    .reverse()
    .join(`:`);
