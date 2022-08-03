import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';

import App from './App.vue';
import router from './router';
import './assets/main.css';
import './firestore/index';

import { getAuth } from 'firebase/auth';

import { useAuth } from './stores/auth';

import DynamicHeading from './components/DynamicHeading.vue';
import TitleWithInfo from './components/TitleWithInfo.vue';
import TheButton from './components/buttons/TheButton.vue';
import ButtonAsLink from './components/buttons/ButtonAsLink.vue';
import MobileWave from './components/icons/MobileWave.vue';
import ArrowLeft from './components/icons/ArrowLeft.vue';
import ButtonReturnAsIcon from './components/buttons/ButtonReturnAsIcon.vue';

(async () => {
  const app = createApp(App).use(createPinia());

  const { bindUser } = useAuth();
  await bindUser(getAuth());

  app.component('DynamicHeading', DynamicHeading);
  app.component('TitleWithInfo', TitleWithInfo);
  app.component('DefaultButton', TheButton);
  app.component('ButtonAsLink', ButtonAsLink);
  app.component('ReturnButton', ButtonReturnAsIcon);

  app.use(router);
  app.mount('#app');

  //ICONS
  app.component('MobileWaveSVG', MobileWave);
  app.component('ArrowLeftSVG', ArrowLeft);
})();