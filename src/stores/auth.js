import { getIdTokenResult, onAuthStateChanged } from 'firebase/auth';
import { defineStore } from 'pinia';

export const useAuth = defineStore({
  id: 'Auth',
  state() {
    return {
      user: null,
      token: null,
    };
  },
  actions: {
    bindUser(auth) {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
          this.user = user;
          if (user) this.token = await getIdTokenResult(user);

          resolve();
        });
      });
    },
  },
});
