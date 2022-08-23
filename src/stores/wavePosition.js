import { defineStore } from 'pinia';
import { useDrink } from '@/stores/drink';
import { useSettings } from '@/stores/settings';
import { useCalcPercentages } from '@/composables/useCalcPercentages';

export const useWavePosition = defineStore('wavePosition', {
  state: () => ({
    transfromStyle: 'transition: translateY(0)',
  }),
  actions: {
    updateTransformStyle(style) {
      this.transfromStyle = style;
    },
    updateTransformStyleBy(name) {
      const waterTotal = useDrink()[name].total;
      const waterGoal = useSettings().settings[name].goal;
      const drinkProgressPercentage = useCalcPercentages(waterTotal, waterGoal);
      this.transfromStyle = `transform: translateY(-${drinkProgressPercentage}%)`;
    },
  },
});
