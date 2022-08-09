export function useSaveInLocalStorage(key, value) {
  console.log(value);
  localStorage.setItem(key, JSON.stringify(value));
}
export function useGetFromLocalStorage(key) {
  const dataFromLocalStorage = localStorage.getItem(key);
  console.log(dataFromLocalStorage);
  if (dataFromLocalStorage !== null) return JSON.parse(dataFromLocalStorage);
  return null;
}
export function useRemoveFromLocalStorage(key) {
  const data = useGetFromLocalStorage(key);
  useSaveInLocalStorage(key, data);
}

