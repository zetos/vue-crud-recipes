import firebase from 'firebase';
// import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCDnZ8aifFth0DIHmTxfJbECsfIHc6X8xA',
  authDomain: 'vue-crud-recipes.firebaseapp.com',
  databaseURL: 'https://vue-crud-recipes.firebaseio.com',
  projectId: 'vue-crud-recipes',
  storageBucket: 'vue-crud-recipes.appspot.com',
  messagingSenderId: '413787831457',
  appId: '1:413787831457:web:02b11bba9c7e75b2d1c4e0'
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
