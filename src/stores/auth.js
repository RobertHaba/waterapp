import { getIdTokenResult, onAuthStateChanged } from 'firebase/auth';
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
    bindUserFromFirebase(auth) {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
          this.user = user;
          if (user) {
            this.token = await getIdTokenResult(user);
            this.isFirebaseDB = true;
          }

          resolve();
        });
      });
    },
  },
});
