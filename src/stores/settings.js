import { defineStore } from 'pinia';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../firestore/index';
import { useGetFromLocalStorage } from '@/composables/useLocalStorage';
import { useGetDataFromDB } from '@/composables/useFirebase.js';

export const useSettings = defineStore('userSettings', {
  state: () => ({
    settings: null,
  }),
  actions: {
    async getUserSettings() {
      if (useAuth().isFirebaseDB) {
        this.settings = await this.getSettingsDataFromDB();
        return;
      }
      this.settings = useGetFromLocalStorage('settings');
    },
    getSettingsDataFromDB() {
      const docRef = doc(db, useAuth().user.uid, 'settings');
      return useGetDataFromDB(docRef);
    },
    updateSettingsData(keyName, newValue) {
      this.settings[keyName] = newValue;
      console.log(useAuth().user.uid);
      if (useAuth().user.uid) {
        this.updateSettingsInDB();
      }
    },
    async updateSettingsInDB() {
      const docRef = doc(db, useAuth().user.uid, 'settings');
      await updateDoc(docRef, this.settings);
    },
  },
});
