self.addEventListener('fetch', () => console.log('fetch'));
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function (reg) {
      console.log('Successfully registered service worker', reg);
    })
    .catch(function (err) {
      console.warn('Error whilst registering service worker', err);
    });
}