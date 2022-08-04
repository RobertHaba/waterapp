import { defineStore } from 'pinia';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../firestore/index';
export const useDrink = defineStore('drink', {
  state: () => ({
    drink: {
      total: 0,
      history: [],
    },
  }),
  actions: {
    async getDrinkData() {
      const docRef = doc(db, useAuth().user.uid, 'drink');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.drink = docSnap.data();
      }
    },
    addDrink(drink) {
      this.drink.total += drink.capacity;
      const now = new Date();
      const drinkWithDate = {
        date: now,
        ...drink,
      };
      this.drink.history.unshift(drinkWithDate);
      if (useAuth().user.uid) {
        this.updateDrinkInDB();
      }
    },
    async updateDrinkInDB() {
      const docRef = doc(db, useAuth().user.uid, 'drink');
      await updateDoc(docRef, this.drink);
    },
  },
});
