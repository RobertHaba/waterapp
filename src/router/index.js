import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../stores/auth';
import { useProfile } from '../stores/profile';
import { db } from '@/firestore/index';
import { collection, doc, getDoc } from 'firebase/firestore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'gender' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'gender' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/settings/drink',
      name: 'drinkSettings',
      component: () => import('../views/settings/DrinkSettings.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'gender' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/settings/account',
      name: 'account',
      component: () => import('../views/settings/AccountView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'gender' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/settings/drinks',
      name: 'drinks',
      component: () => import('../views/settings/DrinksView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'gender' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/Welcome.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next({ name: 'home' });
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'gender' });
        } else next();
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next({ name: 'home' });
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'gender' });
        } else next();
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next({ name: 'home' });
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'gender' });
        } else next();
      },
    },
    {
      path: '/gender',
      name: 'gender',
      component: () => import('../views/firstRun/Gender.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next({ name: 'home' });
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next();
        } else next({ name: 'signin' });
      },
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
    {
      path: '/:pathMatch(.*)',
      name: 'notFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
});
const checkIfDateExistsInDB = async () => {
  if (useAuth().user === false) {
    return false;
  }
  return (await useProfile().user) === null ? false : true;
};
const userIsAuth = async () => {
  const auth = useAuth();
  return auth.user === null ? false : auth.user;
};

export default router;
