import { defineStore } from 'pinia';
import {
  doc,
  updateDoc,
  setDoc,
  query,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../firestore/index';
import {
  useGetFromLocalStorage,
  useSaveInLocalStorage,
} from '@/composables/useLocalStorage';
export const useDrink = defineStore('drink', {
  state: () => ({
    drink: {
      total: 0,
    },
    history: { today: [], all: [] },
  }),
  actions: {
    addDrink(drink) {
      this.addDrinkToHistory(drink);
      this.drink.total += drink.capacity;
    },
    removeDrink(drinkToRemove) {
      const date = new Date(drinkToRemove.date);
      const today = date.toLocaleDateString('pl-PL');
      const index = this.history.today.findIndex(
        (drink) => drink.date === drinkToRemove.date
      );
      this.history.today.splice(index, 1);
      this.drink.total -= drinkToRemove.capacity;
      if (useAuth().isFirebaseDB) {
        this.removeDrinkFromDB(today, drinkToRemove);
        return;
      }
      this.history.all[this.history.all.length - 1] = {
        [today]: this.history.today,
      };
      useSaveInLocalStorage('history', this.history.all);
    },
    async removeDrinkFromDB(today, drink) {
      await deleteDoc(
        doc(db, useAuth().user.uid, 'history', today, '' + drink.date)
      );
    },
    async getTodayDrinkHistory() {
      const date = new Date();
      const today = date.toLocaleDateString('pl-PL');
      if (useAuth().isFirebaseDB) {
        await this.getTodayDrinkHistoryFromDB(today);
      } else {
        const drinkHistoryFromLocalStorage = useGetFromLocalStorage('history');
        if (drinkHistoryFromLocalStorage) {
          const lastId = drinkHistoryFromLocalStorage.length - 1;
          this.history.all = drinkHistoryFromLocalStorage;
          this.history.today = drinkHistoryFromLocalStorage[lastId][today];
        }
      }
      this.getTodayTodalDrink();
    },
    async getTodayDrinkHistoryFromDB(today) {
      const q = query(collection(db, useAuth().user.uid, 'history', today));
      const docSnap = await getDocs(q);
      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          this.history.today.unshift(doc.data());
        });
      }
    },
    getTodayTodalDrink() {
      this.history.today.forEach((drink) => {
        this.drink.total += drink.capacity;
      });
    },
    addDrinkToHistory(drink) {
      const timestamp = Date.now();
      const date = new Date(timestamp);
      const today = date.toLocaleDateString('pl-PL');
      const drinkWithDate = {
        date: timestamp,
        ...drink,
      };
      this.history.today.unshift(drinkWithDate);
      if (useAuth().isFirebaseDB) {
        this.addTodayDrinkHistoryInDB(timestamp, today, drinkWithDate);
        return;
      }
      useSaveInLocalStorage('history', [{ [today]: this.history.today }]);
    },
    async addTodayDrinkHistoryInDB(timestamp, today, drink) {
      const docRef = doc(
        db,
        useAuth().user.uid,
        'history/' + today + '/' + timestamp
      );
      await setDoc(docRef, { ...drink });
    },
    async createTodayHistoryDocInDB(today) {
      const docRef = doc(db, useAuth().user.uid, 'history');
      await addDoc(collection(docRef, today));
    },
  },
});
