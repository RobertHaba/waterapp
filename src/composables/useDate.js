export function useToday() {
  const date = new Date();
  const today = date.toLocaleDateString('pl-PL');
  return today;
}
export function useTodayWithDate() {
  const date = new Date();
  const today = date.toLocaleDateString('pl-PL');
  return { today, date };
}
export function useYesterdayWithDate() {
  const date = new Date();
  const yesterdayFull = date.setDate(date.getDate() - 1);
  const yesterday = new Date(yesterdayFull).toLocaleDateString('pl-PL');
  return { yesterday, date };
}
