import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';

import App from './App.vue';
import router from './router';
import './assets/main.css';
import './firestore/index';

import { useAuth } from './stores/auth';

import DynamicHeading from './components/DynamicHeading.vue';
import TitleAndDescription from './components/texts/TitleAndDescription.vue';
import BaseButton from './components/buttons/BaseButton.vue';
import WaveIcon from '././components/icons/WaveIcon.vue';
import ArrowLeftIcon from './components/icons/ArrowLeftIcon.vue';
import ReturnButton from './components/buttons/ReturnButton.vue';
import ShadowList from './components/ShadowList.vue';
import BaseLayout from './components/BaseLayout.vue';
import { useGetFromLocalStorage } from './composables/useLocalStorage';
import { useGetAppData } from './composables/useGetAppData.js';
(async () => {
  const app = createApp(App).use(createPinia());

  const isFirebaseAccount = useGetFromLocalStorage('isFirebaseAccount');
  if (!isFirebaseAccount) {
    useAuth().bindUserFromLocalStorage();
  } else {
    await useAuth().bindUserFromFirebase();
  }
  await useGetAppData();
  app.component('DynamicHeading', DynamicHeading);
  app.component('TitleAndDescription', TitleAndDescription);
  app.component('BaseButton', BaseButton);
  app.component('ReturnButton', ReturnButton);
  app.component('ShadowList', ShadowList);
  app.component('BaseLayout', BaseLayout);

  app.use(router);
  app.mount('#app');

  //ICONS
  app.component('WaveIcon', WaveIcon);
  app.component('ArrowLeftIcon', ArrowLeftIcon);
})();
