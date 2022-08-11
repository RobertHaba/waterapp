import { useProfile } from '@/stores/profile.js';
import notificationSound from '../assets/audio/notification-sound.wav';
import { useSaveInLocalStorage } from '../composables/useLocalStorage';
export function useRequestForNotificationPermission() {
  return new Promise((resolve) => {
    Notification.requestPermission((permission) => {
      resolve(permission === 'granted' ? true : false);
    });
  });
}
export function useSendNotification() {
  const notificationSettings = useProfile().user.notifications;
  const timestamp = new Date().getTime();
  const title = 'Czas na wode!';
  const text = 'Popij i uzupełnij płyny';
  const options = {
    body: text,
    vibrate: notificationSettings.vibrations ? [200, 100, 200] : false,
    badge: 'https://spyna.it/icons/android-icon-192x192.png',
    timestamp: timestamp,
    actions: [
      {
        action: 'small-sip',
        title: '150ml',
      },
      {
        action: 'big-sip',
        title: '250ml',
      },
    ],
  };
  useSaveInLocalStorage('lastNotification', timestamp);
  const audio = new Audio(notificationSound);
  navigator.serviceWorker.ready.then(function (serviceWorker) {
    serviceWorker.showNotification(title, options);
    if (notificationSettings.sound) {
      audio.play();
    }
  });
}
