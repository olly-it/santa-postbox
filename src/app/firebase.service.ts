import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  query,
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  where,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  UploadResult,
  getBytes,
  getDownloadURL,
} from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {}
  me: any = {};

  composeFullname(name: string, surname: string): string {
    if (surname) surname = surname.trim();
    if (name) name = name.trim();
    return name+" "+surname;
  }

  async getMe(name:string, surname:string, birthDate:string) : Promise<{id:string, data:any}|null> {
    console.log('getMe function invoked: ', name, surname, birthDate);
    //const q = query(collection(db, "postbox"), where("name", "==", name), where("birthDate", "==", birthDate));
    const q = query(
      collection(db, "postbox"),
      where("fullname_lower", "==", this.composeFullname(name,surname).trim().toLowerCase()),
      where("birthDate", "==", birthDate));
    let querySnapshot = await getDocs(q);
    //let ret = querySnapshot.docs.map(doc =>  {id:doc.id, data:doc.data()});
    try {
      return querySnapshot.docs.map( x => { return {id:x.id,data:x.data()} })[0];
    } catch (e) {
      return null;
    }
  }

  add(name: string, surname: string, birthDate: string, address: string) {
    console.log('onAdd function invoked');
    if (name == '') return;
    try {
      const now = new Date();
      addDoc(collection(db, 'postbox'), {
        name: name,
        surname: surname,
        fullname_lower: this.composeFullname(name,surname).trim().toLowerCase(),
        birthDate: birthDate,
        address: address,
        creationDate: now.toISOString()
      }).then((x) => {
        console.log('Document written with ID: ', x.id);
        this.getMe(name, surname, birthDate);
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  del(id: string) {
    deleteDoc(doc(db, 'postbox', id)).then(() => {
      this.me = {};
    });
  }

  uploadFile(fileId: string, file: File): Promise<UploadResult> {
    const fileRef = ref(storage, fileId);
    console.log('upload fileRef: ' + fileRef);
    return uploadBytes(fileRef, file);
  }

  getFileUrl(fileId: string): Promise<string> {
    return getDownloadURL(ref(storage, fileId));
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

// Create a root reference
const storage = getStorage(app);
