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
