self.addEventListener('fetch', () => console.log('fetch'));
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js', { scope: '/' })
    .then(function (reg) {
      reg.pushManager.getSubscription().then((sub) => {
        console.log(sub);
      });
    })
    .catch(function () {});
}
