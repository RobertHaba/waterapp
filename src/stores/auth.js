import { getIdTokenResult, onAuthStateChanged, getAuth } from 'firebase/auth';
import { defineStore } from 'pinia';
import { useGetFromLocalStorage } from '@/composables/useLocalStorage';

export const useAuth = defineStore({
  id: 'Auth',
  state() {
    return {
      user: null,
      token: null,
      isFirebaseDB: false,
    };
  },
  actions: {
    bindUserFromLocalStorage() {
      const userFromLocalStorage = useGetFromLocalStorage('user');
      console.log(userFromLocalStorage);
      if (userFromLocalStorage !== null) {
        this.user = userFromLocalStorage;
      }
    },
    bindUserFromFirebase(res) {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(getAuth(), async (user) => {
          console.log('1');
          this.user = user;
          if (user) {
            this.isFirebaseDB = true;
            this.token = await getIdTokenResult(user);
          }
          resolve();
        });
      });
    },
  },
});
