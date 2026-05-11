const isNonEmptyString = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const isValidLatitude = (value) => {
  const num = toNumber(value);
  return num !== null && num >= -90 && num <= 90;
};

const isValidLongitude = (value) => {
  const num = toNumber(value);
  return num !== null && num >= -180 && num <= 180;
};

module.exports = {
  isNonEmptyString,
  isValidLatitude,
  isValidLongitude,
  toNumber,
};
