import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';

import App from './App.vue';
import router from './router';
import './assets/main.css';
import './firestore/index';

import { getAuth } from 'firebase/auth';
import { useProfile } from './stores/profile';
import { useSettings } from './stores/settings';
import { useDrink } from './stores/drink';

import { useAuth } from './stores/auth';

import DynamicHeading from './components/DynamicHeading.vue';
import TitleAndDescription from './components/texts/TitleAndDescription.vue';
import BaseButton from './components/buttons/BaseButton.vue';
import WaveIcon from '././components/icons/WaveIcon.vue'
import ArrowLeftIcon from './components/icons/ArrowLeftIcon.vue';
import ReturnButton from './components/buttons/ReturnButton.vue';
import ShadowList from './components/ShadowList.vue';
import BaseLayout from './components/BaseLayout.vue';

(async () => {
  const app = createApp(App).use(createPinia());

  const { bindUserFromFirebase, bindUserFromLocalStorage } = useAuth();
  await bindUserFromFirebase(getAuth());
  if (useAuth().isFirebaseDB === false) {
    console.log(useAuth().isFirebaseDB);
    bindUserFromLocalStorage();
  }
  if (useAuth().user) {
    await useProfile().getUserData();
    await useSettings().getUserSettings();
    await useDrink().getTodayDrinkHistory();
  }
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
