import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {}

  getAll(): [{ id: string; data: any }] {
    var all: any = [];
    console.log('getAll function invoked');
    getDocs(collection(db, 'postbox')).then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        all.push({ id: doc.id, data: JSON.stringify(doc.data()) });
      })
    );
    return all;
  }
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAeUO2Y5pkrH8t5dMlExGWmKW-Oz-Mp2kM',
  authDomain: 'santa-postbox.firebaseapp.com',
  projectId: 'santa-postbox',
  storageBucket: 'santa-postbox.appspot.com',
  messagingSenderId: '641580290869',
  appId: '1:641580290869:web:f71c5abb63e64cf96db27c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
