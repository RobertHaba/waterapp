import { useProfile } from '@/stores/profile';

export function useCalcGoal(userData = useProfile().user) {
  const user = userData;
  let weight = user.weight;
  let drinkGoal;

  if (weight >= 20) {
    drinkGoal = 10 * 100 + 10 * 50 + (weight - 20) * 20;
  } else if (weight > 10) {
    drinkGoal = 10 * 100 + (weight - 10) * 50;
  } else {
    drinkGoal = weight * 100;
  }
  switch (user.activity) {
    case 'low':
      drinkGoal += 350;
      break;
    case 'medium':
      drinkGoal += 650;
      break;
    case 'high':
      drinkGoal += 1300;
      break;
  }
  return drinkGoal;
}
