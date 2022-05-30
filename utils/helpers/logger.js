export const logger = {
  print: (...args) => {
    console.log(...args);
  },
  error: (...args) => {
    console.error(...args);
  },
  warn: (...args) => {
    console.warn(...args);
  },
  info: (...args) => {
    console.info(...args);
  },
  debug: (...args) => {
    console.debug(...args);
  },
  trace: (...args) => {
    console.trace(...args);
  },
};
