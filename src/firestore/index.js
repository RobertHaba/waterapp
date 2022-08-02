import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDcq_BIW0Aftn1qEaFXuDjP7KYNoI28m9s',

  authDomain: 'watter-app.firebaseapp.com',

  projectId: 'watter-app',

  storageBucket: 'watter-app.appspot.com',

  messagingSenderId: '482500183406',

  appId: '1:482500183406:web:deea36a500b29693042d7f',

  measurementId: 'G-Z8LHJ4LRWD',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
