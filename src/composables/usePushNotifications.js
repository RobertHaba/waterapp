import { useProfile } from '@/stores/profile.js';
import notificationSound from '../assets/audio/notification-sound.wav';
export function useRequestForNotificationPermission() {
  return new Promise((resolve) => {
    Notification.requestPermission((permission) => {
      resolve(permission === 'granted' ? true : false);
    });
  });
}
export function useSendNotification() {
  const notificationSettings = useProfile().user.notifications;
  const title = 'Czas na wode!';
  const text = 'Popij i uzupełnij płyny';
  const options = {
    body: text,
    vibrate: notificationSettings.vibrations ? [200, 100, 200] : false,
    badge: 'https://spyna.it/icons/android-icon-192x192.png',
    actions: [
      {
        action: 'small-sip',
        title: '150ml',
        icon: 'https://via.placeholder.com/128/ff0000',
      },
      {
        action: 'big-sip',
        title: '250ml',
        icon: 'https://via.placeholder.com/128/ff0000',
      },
    ],
  };
  const audio = new Audio(notificationSound);

  navigator.serviceWorker.ready.then(function (serviceWorker) {
    serviceWorker.showNotification(title, options);
    if (notificationSettings.sound) {
      audio.play();
    }
  });
}
