import { defineStore } from 'pinia';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../firestore/index';
export const useProfile = defineStore('profile', {
  state: () => ({
    user: null,
    settings: null,
  }),
  actions: {
    async getUserData() {
      const docRef = doc(db, useAuth().user.uid, 'profile');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.user = docSnap.data();
      }
    },
    async getUserSettings() {
      const docRef = doc(db, useAuth().user.uid, 'settings');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.settings = docSnap.data();
      }
    },
    updateUserData(newData) {
      this.user = newData;
      if (useAuth().user.uid) {
        this.updateUserDataInDB(newData);
      }
    },
    async updateUserDataInDB(newData) {
      const docRef = doc(db, useAuth().user.uid, 'profile');
      await updateDoc(docRef, newData);
    },
    updateSettingsData(keyName, newValue) {
      this.settings[keyName] = newValue;
    },
  },
});
