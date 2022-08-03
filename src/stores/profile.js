import { defineStore } from 'pinia';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../firestore/index';
export const useProfile = defineStore('profile', {
  state: () => ({
    user: {
      gender: null,
      weight: null,
      activity: null,
      year: null,
      name: null,
      notifications: {
        active: false,
        wakeUp: null,
        bedtime: null,
      },
    },
  }),
  actions: {
    async getUserData() {
      const docRef = doc(db, useAuth().user.uid, 'profile');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.user = docSnap.data();
      }
    },
  },
});
useProfile().getUserData();
