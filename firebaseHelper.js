// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, child, get } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB90XqLI_e0lhyNs9NiB0bZbxXjR0kJSkE',
  authDomain: 'graphql-blog-d530c.firebaseapp.com',
  databaseURL: 'https://graphql-blog-d530c-default-rtdb.firebaseio.com/',
  projectId: 'graphql-blog-d530c',
  storageBucket: 'graphql-blog-d530c.appspot.com',
  messagingSenderId: '155844612595',
  appId: '1:155844612595:web:46046db177509c415ec286',
  measurementId: 'G-KC18R8V51G',
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const database = ref(getDatabase(firebase))
export { database, child, get, firebase }
