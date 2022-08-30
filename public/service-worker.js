self.addEventListener('fetch', () => console.log('fetch'));
self.importScripts('localforage.min.js');
self.addEventListener('notificationclick', function (event) {
  if (!event.action) {
    // Was a normal notification click
    return;
  }
  const timestamp = new Date().getTime();
  let drink = {
    capacity: 0,
    date: timestamp,
    name: 'woda',
  };
  switch (event.action) {
    case 'small-sip':
      drink.capacity = 150;
      break;
    case 'big-sip':
      drink.capacity = 250;
      break;
  }
  localforage.setItem(timestamp.toString(), drink);
});
