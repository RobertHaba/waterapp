self.importScripts('localforage.min.js');
self.addEventListener('notificationclick', function (event) {
  if (!event.action) {
    // Was a normal notification click
    console.log('Notification Click.');
    return;
  }
  const date = new Date();
  const timestamp = +date;
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
