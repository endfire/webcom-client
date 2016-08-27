export default (type, param) =>
  new TypeError(`Tried dispatching ${type} without required param ${param}`);
