export const pause = (milliseconds, value) => {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(value) }, milliseconds);
  });
};