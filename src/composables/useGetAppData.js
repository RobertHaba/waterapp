import { useProfile } from '@/stores/profile';
import { useSettings } from '@/stores/settings';
import { useDrink } from '@/stores/drink';

export async function useGetAppData() {
  await useProfile().getUserData();
  await useSettings().getUserSettings();
  await useDrink().getTodayDrinkHistory();
}
