import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../stores/auth';
import { useProfile } from '../stores/profile';
import { useGetAppData } from '@/composables/useGetAppData.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/drink',
      name: 'drinkApp',
      component: () => import('../views/DrinkView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/settings/drink',
      name: 'drinkSettings',
      component: () => import('../views/settings/DrinkSettingsView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/settings/drinks/add',
      name: 'drinkItemAdd',
      component: () => import('../views/settings/DrinkAddView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next({ name: 'signin' });
      },
      props: true,
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
          next({ name: 'selectMode' });
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
          next({ name: 'selectMode' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/settings/notifications',
      name: 'notificationsSettings',
      component: () => import('../views/settings/NotificationsView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/settings/informations',
      name: 'informationsSettings',
      component: () => import('../views/settings/InformationsView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next();
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next({ name: 'signin' });
      },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next({ name: 'home' });
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next();
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next({ name: 'home' });
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next();
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue'),
      beforeEnter: async (to, from, next) => {
        if ((await userIsAuth()) && (await checkIfDateExistsInDB())) {
          next({ name: 'home' });
        } else if (
          (await userIsAuth()) &&
          (await checkIfDateExistsInDB()) === false
        ) {
          next({ name: 'selectMode' });
        } else next();
      },
    },
    {
      path: '/select-mode',
      name: 'selectMode',
      component: () => import('../views/firstRun/FirstSelectModeView.vue'),
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
      path: '/gender',
      name: 'gender',
      component: () => import('../views/firstRun/FirstGenderView.vue'),
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
      component: () => import('../views/firstRun/FirstWeightView.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'gender' || from.name === 'activity') {
          next();
        } else next({ name: 'selectMode' });
      },
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/firstRun/FirstActivityView.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'weight' || from.name === 'year') {
          next();
        } else next({ name: 'selectMode' });
      },
    },
    {
      path: '/year',
      name: 'year',
      component: () => import('../views/firstRun/FirstYearView.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'activity' || from.name === 'name') {
          next();
        } else next({ name: 'selectMode' });
      },
    },
    {
      path: '/name',
      name: 'name',
      component: () => import('../views/firstRun/FIrstNameView.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'year' || from.name === 'notifications') {
          next();
        } else next({ name: 'selectMode' });
      },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/firstRun/FirstNotificationsView.vue'),
      beforeEnter: (to, from, next) => {
        if (
          from.name === 'name' ||
          from.name === 'activityHours' ||
          from.name === 'finish'
        ) {
          next();
        } else next({ name: 'selectMode' });
      },
    },
    {
      path: '/activityHours',
      name: 'activityHours',
      component: () => import('../views/firstRun/FirstActivityHoursView.vue'),
      beforeEnter: (to, from, next) => {
        if (from.name === 'notifications' || from.name === 'finish') {
          next();
        } else next({ name: 'selectMode' });
      },
    },
    {
      path: '/finish',
      name: 'finish',
      component: () => import('../views/firstRun/FirstFinishView.vue'),
      beforeEnter: (to, from, next) => {
        if (
          from.name === 'selectMode' ||
          from.name === 'notifications' ||
          from.name === 'activityHours'
        ) {
          next();
        } else if (from.name !== 'selectMode') {
          next({ name: 'selectMode' });
        } else {
          next();
        }
      },
    },
    {
      path: '/:pathMatch(.*)',
      beforeEnter: (to, from, next) => {
        next({ name: 'home' });
      },
    },
  ],
});
const checkIfDateExistsInDB = async () => {
  if (useAuth().user === false) {
    return false;
  }
  if (useProfile().user === null) {
    await useGetAppData();
  }
  return useProfile().user === null ? false : true;
};
const userIsAuth = async () => {
  const auth = useAuth();
  return auth.user === null ? false : auth.user;
};
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('firstVisit') === null) {
    localStorage.setItem('firstVisit', true);
    next({ name: 'welcome' });
  } else {
    next();
  }
});
export default router;
