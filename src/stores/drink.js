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
export const useDrink = defineStore('drink', {
  state: () => ({
    drink: {
      total: 0,
    },
    history: { today: [] },
  }),
  actions: {
    addDrink(drink) {
      this.addDrinkToHistory(drink);
      this.drink.total += drink.capacity;
    },
    removeDrink(drinkToRemove) {
      const index = this.history.today.findIndex(
        (drink) => drink.date === drinkToRemove.date
      );
      this.history.today.splice(index, 1);
      this.drink.total -= drinkToRemove.capacity;
      if (useAuth().user.uid) {
        this.removeDrinkFromDB(drinkToRemove);
      }
    },
    async removeDrinkFromDB(drink) {
      const date = new Date(drink.date);
      const today = date.toLocaleDateString('pl-PL');
      await deleteDoc(
        doc(db, useAuth().user.uid, 'history', today, '' + drink.date)
      );
    },
    async getTodayDrinkHistory() {
      const date = new Date();
      const today = date.toLocaleDateString('pl-PL');
      const q = query(collection(db, useAuth().user.uid, 'history', today));
      const docSnap = await getDocs(q);

      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          console.log(doc.data());
          this.history.today.unshift(doc.data());
        });
        this.getTodayTodalDrink();
      }
    },
    getTodayTodalDrink() {
      this.history.today.forEach((drink) => {
        this.drink.total += drink.capacity;
      });
    },
    async addTodayDrinkHistoryInDB(timestamp, drink) {
      const date = new Date(timestamp);
      const today = date.toLocaleDateString('pl-PL');
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
    addDrinkToHistory(drink) {
      const timestamp = Date.now();
      const drinkWithDate = {
        date: timestamp,
        ...drink,
      };
      this.history.today.unshift(drinkWithDate);
      if (useAuth().user.uid) {
        this.addTodayDrinkHistoryInDB(timestamp, drinkWithDate);
      }
    },
  },
});
