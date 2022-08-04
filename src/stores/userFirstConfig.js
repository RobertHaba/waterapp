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
    settings: {
      drink: {
        goal: 2800,
        autoCalc: true,
        list: {
          dynamic: {
            capacity: 500,
            name: 'water',
          },
          statics: [
            {
              capacity: 150,
              name: 'water',
            },
            {
              capacity: 250,
              name: 'water',
            },
            {
              capacity: 350,
              name: 'water',
            },
          ],
        },
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
