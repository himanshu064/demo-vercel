import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp(firebaseConfig);

export default {
  firestoreDB: getFirestore(firebaseApp),
  auth: getAuth(firebaseApp),
};
