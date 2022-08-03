import { defineStore } from 'pinia';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import { db } from '../firestore/index';
export const useProfile = defineStore('profile', {
  state: () => ({
    user: null,
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
