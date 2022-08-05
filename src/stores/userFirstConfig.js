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
            name: 'woda',
          },
          statics: [
            {
              capacity: 150,
              name: 'woda',
            },
            {
              capacity: 250,
              name: 'woda',
            },
            {
              capacity: 350,
              name: 'woda',
            },
          ],
        },
      },
      drinks: [{ name: 'woda', kcal: '0' }],
    }
  }),
  actions: {
    updateUserData(data) {
      console.log(data);
      this.user = data;
    },
  },
});
