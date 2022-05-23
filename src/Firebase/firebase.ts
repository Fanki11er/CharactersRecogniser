import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAl7qeKtciiP75Z-KrOI48mIqZiZnRKmYk',
  authDomain: 'characterrecognizer-ffd12.firebaseapp.com',
  databaseURL: 'https://characterrecognizer-ffd12-default-rtdb.firebaseio.com',
  projectId: 'characterrecognizer-ffd12',
  storageBucket: 'characterrecognizer-ffd12.appspot.com',
  messagingSenderId: '397307916924',
  appId: '1:397307916924:web:13a001d52f8a7d615c0ff9',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);



