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
        wakeUp: '07:00',
        bedtime: '23:00',
        sound: true,
        vibrations: true,
      },
    },
    settings: {
      water: {
        goal: 2800,
        autoCalc: true,
        list: {
          dynamic: {
            capacity: 500,
            kcal: 0,
            name: 'woda',
          },
          statics: [
            {
              capacity: 150,
              kcal: 0,
              name: 'woda',
            },
            {
              capacity: 250,
              kcal: 0,
              name: 'woda',
            },
            {
              capacity: 350,
              kcal: 0,
              name: 'woda',
            },
          ],
        },
      },
      drink: {
        goal: 2800,
        autoCalc: true,
        list: {
          dynamic: {
            drinkID: 0,
            capacity: 500,
            kcal: 250,
            name: 'pepsi',
          },
          statics: [
            {
              drinkID: 0,
              capacity: 150,
              kcal: 250,
              name: 'pepsi',
            },
            {
              drinkID: 0,
              capacity: 250,
              kcal: 250,
              name: 'pepsi',
            },
            {
              drinkID: 0,
              capacity: 350,
              kcal: 250,
              name: 'pepsi',
            },
          ],
        },
      },
      drinks: [
        {
          drinkID: 0,
          name: 'pepsi',
          kcal: '250',
        },
      ],
    },
  }),
  actions: {
    updateUserData(data) {
      this.user = data;
    },
  },
});
