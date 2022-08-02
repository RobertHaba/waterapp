import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../stores/auth';
import { db } from '@/firestore/index';
import { collection, doc, getDoc } from 'firebase/firestore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/Welcome.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue'),
    },
    {
      path: '/gender',
      name: 'gender',
      component: () => import('../views/firstRun/Gender.vue'),
    },
    {
      path: '/weight',
      name: 'weight',
      component: () => import('../views/firstRun/Weight.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'gender' || from.name === 'activity') {
          next();
        } else next({ name: 'gender' });
      },
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/firstRun/Activity.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'weight' || from.name === 'year') {
          next();
        } else next({ name: 'gender' });
      },
    },
    {
      path: '/year',
      name: 'year',
      component: () => import('../views/firstRun/Year.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'activity' || from.name === 'name') {
          next();
        } else next({ name: 'gender' });
      },
    },
    {
      path: '/name',
      name: 'name',
      component: () => import('../views/firstRun/Name.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'year' || from.name === 'notifications') {
          next();
        } else next({ name: 'gender' });
      },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/firstRun/Notifications.vue'),
      beforeEnter: (to, from, next) => {
        if (
          from.name === 'name' ||
          from.name === 'activityHours' ||
          from.name === 'finish'
        ) {
          next();
        } else next({ name: 'gender' });
      },
    },
    {
      path: '/activityHours',
      name: 'activityHours',
      component: () => import('../views/firstRun/ActivityHours.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'notifications' || from.name === 'finish') {
          next();
        } else next({ name: 'gender' });
      },
    },
    {
      path: '/finish',
      name: 'finish',
      component: () => import('../views/firstRun/Finish.vue'),
      // beforeEnter: (to, from, next) => {
      //   if (from.name === 'notifications' || from.name === 'activityHours') {
      //     next();
      //   } else next({ name: 'gender' });
      // },
    },
  ],
});
const checkIfDateExistsInDB = async () => {
  const auth = useAuth();
  const docRef = doc(db, auth.user.uid, 'profile');
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};
const userIsAuth = async () => {
  const auth = useAuth();
  return auth.user === null ? false : auth.user;
};
router.beforeEach(async (to, from, next) => {
  console.log(await userIsAuth());
  if ((await userIsAuth()) === false && to.name == 'home') {
    next({ name: 'signin' });
  } else if (
    (await userIsAuth()) &&
    (to.name == 'signin' || to.name == 'register' || to.name == 'welcome')
  ) {
    next({ name: 'home' });
  } else if (
    (await userIsAuth()) &&
    to.name !== 'home' &&
    (await checkIfDateExistsInDB())
  ) {
    next({ name: 'home' });
  } else if (
    (await userIsAuth()) &&
    to.name == 'home' &&
    (await checkIfDateExistsInDB()) === false
  ) {
    next({ name: 'gender' });
  } else next();
});

export default router;
