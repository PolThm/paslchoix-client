export const addDelay = (callback: () => void, delay = 500) => {
  return setTimeout(callback, delay);
};
