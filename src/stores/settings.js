import { defineStore } from 'pinia';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../firestore/index';
import {
  useGetFromLocalStorage,
  useSaveInLocalStorage,
} from '@/composables/useLocalStorage';
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
      if (useAuth().isFirebaseDB) {
        this.updateSettingsInDB();
        return;
      }
      useSaveInLocalStorage('settings', this.settings);
    },
    async updateSettingsInDB() {
      const docRef = doc(db, useAuth().user.uid, 'settings');
      await updateDoc(docRef, this.settings);
    },
  },
});
