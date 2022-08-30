export function useNumValidation(value, max, min = value - 1) {
  if (value >= min && value <= max) {
    return true;
  } else {
    return false;
  }
}
export function useTextValidation(value, max, min = value.length - 1, regex) {
  let regexTest = true;
  if (regex) {
    regexTest = regex.test(value);
  }
  if (value.length >= min && value.length <= max && regexTest === true) {
    return true;
  } else {
    return false;
  }
}
