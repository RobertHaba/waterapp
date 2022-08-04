import { defineStore } from 'pinia';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../firestore/index';
export const useSettings = defineStore('userSettings', {
  state: () => ({
    settings: null,
  }),
  actions: {
    async getUserSettings() {
      const docRef = doc(db, useAuth().user.uid, 'settings');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.settings = docSnap.data();
      }
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
