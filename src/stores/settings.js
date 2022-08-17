import { defineStore } from 'pinia';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import { useDrink } from './drink';
import { db } from '../firestore/index';
import {
  useGetFromLocalStorage,
  useSaveInLocalStorage,
  useGetFromArrayLocalStorage,
} from '@/composables/useLocalStorage';
import { useGetDataFromDB } from '@/composables/useFirebase.js';

export const useSettings = defineStore('userSettings', {
  state: () => ({
    settings: undefined,
    goalHistory: { yesterday: {}, today: {}, all: [] },
  }),
  actions: {
    async getUserSettings() {
      if (useAuth().isFirebaseDB) {
        this.settings = await this.getSettingsDataFromDB();
        this.goalHistory.today = this.settings
          ? this.settings.water.goal
          : null;
        this.getYesterdayGoalHistoryFromDB();
        return;
      }
      this.settings = useGetFromLocalStorage('settings');
      this.getGoalHistoryFromLocally();
    },
    getSettingsDataFromDB() {
      const docRef = doc(db, useAuth().user.uid, 'settings');
      return useGetDataFromDB(docRef);
    },
    getGoalHistoryFromLocally() {
      const result = useGetFromArrayLocalStorage('goalHistory');
      if (result) {
        this.goalHistory.yesterday = result.today;
        this.goalHistory.all = result.others;
      }
    },
    async getYesterdayGoalHistoryFromDB() {
      const date = new Date();
      const yesterdayFull = date.setDate(date.getDate() - 1);
      const yesterday = new Date(yesterdayFull).toLocaleDateString('pl-PL');
      const docRef = doc(
        db,
        useAuth().user.uid,
        'goalHistory',
        'all',
        yesterday
      );
      const docData = await useGetDataFromDB(docRef);
      if (docData) {
        this.goalHistory.yesterday = docData;
      }
    },
    updateSettingsData(keyName, newValue) {
      this.settings[keyName] = newValue;
      if (useAuth().isFirebaseDB) {
        this.updateSettingsInDB();
        return;
      }
      useSaveInLocalStorage('settings', this.settings);
      this.setChangeInGoalHistoryLocally();
    },
    async updateSettingsInDB() {
      const docRef = doc(db, useAuth().user.uid, 'settings');
      await updateDoc(docRef, this.settings);
      if (this.goalHistory.today === this.settings.water.goal) {
        return;
      }
      await this.setChangeInGoalHistoryDB();
      this.goalHistory.today = this.settings.water.goal;
    },
    setChangeInGoalHistoryLocally() {
      const date = new Date();
      const today = date.toLocaleDateString('pl-PL');
      this.getGoalHistoryFromLocally();
      useSaveInLocalStorage('goalHistory', [
        ...this.goalHistory.all,
        {
          [today]: {
            total: useDrink().water.total,
            goal: this.settings.water.goal,
          },
        },
      ]);
    },
    async setChangeInGoalHistoryDB(drinkGoal = null) {
      const date = new Date();
      const today = date.toLocaleDateString('pl-PL');
      const docRef = doc(db, useAuth().user.uid, 'goalHistory/all/' + today);
      await setDoc(docRef, {
        total: useDrink().water.total,
        goal: drinkGoal ? drinkGoal : this.settings.water.goal,
      });
    },
  },
});
