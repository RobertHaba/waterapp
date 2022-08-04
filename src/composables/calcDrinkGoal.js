import { useProfile } from '@/stores/profile';

export function useCalcGoal(userData = useProfile().user) {
  const user = userData;
  let weight = 60;
  let weightResults;
  if (weight >= 20) {
    weightResults = 10 * 100 + 10 * 50 + (weight - 20) * 20;
  } else if (weight > 10) {
    weightResults = 10 * 100 + (weight - 10) * 50;
  } else {
    weightResults = weight * 100;
  }
  switch (user.activity) {
    case 'low':
      weightResults += 350;
      break;
    case 'medium':
      weightResults += 650;
      break;
    case 'high':
      weightResults += 1300;
      break;
  }
  return weightResults;
}
