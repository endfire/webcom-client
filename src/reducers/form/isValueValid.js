export default (name, value, validation) => (
  validation.hasOwnProperty(name)
    ? validation[name](value)
    : true
);
