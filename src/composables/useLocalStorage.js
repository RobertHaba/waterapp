export function useSaveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function useGetFromLocalStorage(key) {
  const dataFromLocalStorage = localStorage.getItem(key);
  if (dataFromLocalStorage !== null) return JSON.parse(dataFromLocalStorage);
  return null;
}
export function useRemoveFromLocalStorage(key) {
  const data = useGetFromLocalStorage(key);
  useSaveInLocalStorage(key, data);
}
export function useGetFromArrayLocalStorage(key) {
  const date = new Date();
  const today = date.toLocaleDateString('pl-PL');
  const data = useGetFromLocalStorage(key);
  const result = { today: {}, others: [] };
  if (data) {
    const dataLength = data.length;
    const lastId = dataLength - 1;
    result.today = data[lastId][today];
    console.log(dataLength);
    if (dataLength > 1 && result.today) {
      data.pop();
      result.others = data;
    } else if (!result.today) {
      result.others = data;
    }
    return result;
  }
  return null;
}
