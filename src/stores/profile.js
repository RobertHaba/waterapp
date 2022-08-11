import { defineStore } from 'pinia';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../firestore/index';
import {
  useGetFromLocalStorage,
  useSaveInLocalStorage,
} from '@/composables/useLocalStorage';
import { useGetDataFromDB } from '@/composables/useFirebase.js';

export const useProfile = defineStore('profile', {
  state: () => ({
    user: null,
  }),
  actions: {
    async getUserData() {
      if (useAuth().isFirebaseDB) {
        this.user = await this.getUserDataFromDB();
        return;
      }

      this.user = useGetFromLocalStorage('profile');
    },
    getUserDataFromDB() {
      const docRef = doc(db, useAuth().user.uid, 'profile');
      return useGetDataFromDB(docRef);
    },
    updateUserData(newData) {
      this.user = newData;
      if (useAuth().isFirebaseDB) {
        this.updateUserDataInDB(newData);
        return;
      }
      useSaveInLocalStorage('profile', this.user);
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
