import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { FIREBASE_KEY } from '../envirement';

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: 'characterrecognizer-ffd12.firebaseapp.com',
  databaseURL: 'https://characterrecognizer-ffd12-default-rtdb.firebaseio.com',
  projectId: 'characterrecognizer-ffd12',
  storageBucket: 'characterrecognizer-ffd12.appspot.com',
  messagingSenderId: '397307916924',
  appId: '1:397307916924:web:13a001d52f8a7d615c0ff9',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

/*const testDb = async () => {
  console.log('RUN');
  const dbReference = ref(database, 'Numbers');
  set(dbReference, {
    '1': [],
    '2': [],
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  const newPostKey = push(child(ref(database), '/Numbers')).key;
  console.log(newPostKey);

  get(child(dbReference, `/Hello`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

testDb();*/

