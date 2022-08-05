export function useWatchForValueChange(newVal, oldVal) {
  return newVal !== oldVal ? true : false;
}
