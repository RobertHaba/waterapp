export function useCalcPercentages(partialVal, totalVal) {
  const drinkPercentage = ((partialVal * 100) / totalVal).toFixed();
  return drinkPercentage >= 100 ? 100 : drinkPercentage;
}
