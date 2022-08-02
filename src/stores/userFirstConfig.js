import { defineStore } from 'pinia';

export const useUserFirstConfig = defineStore('userFirstConfig', {
  state: () => ({
    user: {
      gender: null,
      weight: null,
      activity: null,
      year: null,
      name: null,
      notifications: {
        active: false,
        wakeUp: null,
        bedtime: null,
      },
    },
  }),
  actions: {
    updateUserData(data) {
      console.log(data);
      this.user = data;
    },
  },
});
