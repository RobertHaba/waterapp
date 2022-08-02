import { defineStore } from 'pinia';

export const useWavePosition = defineStore('wavePosition', {
  state: () => ({
    transfromStyle: 'transition: translateY(0)',
  }),
  actions: {
    updateTransformStyle(style) {
      console.log(style);
      this.transfromStyle = style;
    },
  },
});
