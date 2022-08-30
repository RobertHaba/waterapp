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
import { useSettings } from './settings';
import { db } from '../firestore/index';
import {
  useGetFromLocalStorage,
  useSaveInLocalStorage,
  useGetFromArrayLocalStorage,
} from '@/composables/useLocalStorage';
export const useDrink = defineStore('drink', {
  state: () => ({
    drink: {
      total: 0,
    },
    water: {
      total: 0,
    },
    history: { today: [], all: [] },
    waterHistory: { today: [], all: [] },
    drinkHistory: { today: [], all: [] },
  }),
  actions: {
    addDrink(drink, mode) {
      this[mode].total += drink.capacity;
      this.addDrinkToHistory(drink, mode);
    },
    removeDrink(drinkToRemove, mode) {
      const date = new Date(drinkToRemove.date);
      const today = date.toLocaleDateString('pl-PL');
      const historyPath = mode + 'History';
      const index = this[historyPath].today.findIndex(
        (drink) => drink.date === drinkToRemove.date
      );
      this[historyPath].today.splice(index, 1);
      this[mode].total -= drinkToRemove.capacity;
      if (useAuth().isFirebaseDB) {
        this.removeDrinkFromDB(today, drinkToRemove, historyPath);
        return;
      }
      const allHistoryLength = this[historyPath].all.length;
      if (this[historyPath].today.length > 0) {
        this[historyPath].all[allHistoryLength] = {
          [today]: this[historyPath].today,
        };
      }
      useSaveInLocalStorage(historyPath, this[historyPath].all);
    },
    async removeDrinkFromDB(today, drink, historyPath) {
      await deleteDoc(
        doc(db, useAuth().user.uid, historyPath, today, '' + drink.date)
      );
    },
    async getTodayDrinkHistory() {
      const date = new Date();
      const today = date.toLocaleDateString('pl-PL');
      if (useAuth().isFirebaseDB) {
        await this.getTodayDrinkHistoryFromDB(today, 'waterHistory');
        await this.getTodayDrinkHistoryFromDB(today, 'drinkHistory');
        this.getTodayTodalDrink('water');
        this.getTodayTodalDrink('drink');
        return;
      }
      this.getTodayDrinkHistoryFromLocally('water');
      this.getTodayDrinkHistoryFromLocally('drink');
    },
    getTodayDrinkHistoryFromLocally(mode) {
      const historyPath = mode + 'History';
      const result = useGetFromArrayLocalStorage(historyPath);
      if (result) {
        this[historyPath].today = result.today;
        this[historyPath].all = result.others;
      }
      if (!this[historyPath].today) {
        this[historyPath].today = [];
        return;
      }
      this.getTodayTodalDrink(mode);
    },
    async getTodayDrinkHistoryFromDB(today, historyPath) {
      const q = query(collection(db, useAuth().user.uid, historyPath, today));
      const docSnap = await getDocs(q);
      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          this[historyPath].today.unshift(doc.data());
        });
      }
    },
    getTodayTodalDrink(mode) {
      this[mode + 'History'].today.forEach((drink) => {
        this[mode].total += drink.capacity;
      });
    },
    addDrinkToHistory(drink, mode = 'water') {
      const timestamp = Date.now();
      const date = new Date(timestamp);
      const today = date.toLocaleDateString('pl-PL');
      const drinkWithDate = {
        date: timestamp,
        ...drink,
      };
      const historyPath = mode + 'History';
      this[historyPath].today.unshift(drinkWithDate);
      if (useAuth().isFirebaseDB) {
        this.addTodayDrinkHistoryInDB(
          timestamp,
          today,
          drinkWithDate,
          historyPath
        );
        return;
      }
      useSaveInLocalStorage(historyPath, [
        ...this[historyPath].all,
        { [today]: this[historyPath].today },
      ]);
      useSettings().setChangeInGoalHistoryLocally();
    },
    async addTodayDrinkHistoryInDB(timestamp, today, drink, historyPath) {
      const docRef = doc(
        db,
        useAuth().user.uid,
        historyPath + '/' + today + '/' + timestamp
      );
      await setDoc(docRef, { ...drink });

      useSettings().setChangeInGoalHistoryDB();
    },
  },
});
