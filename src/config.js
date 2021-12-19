import firebase from 'firebase'
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBnI794unZQexxgTQcNqSaqN5WvZbcHQu0",
  authDomain: "rentaverse-87da6.firebaseapp.com",
  databaseURL: "https://rentaverse-87da6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rentaverse-87da6",
  storageBucket: "rentaverse-87da6.appspot.com",
  messagingSenderId: "111261116872",
  appId: "1:111261116872:web:2606cab414a18e13dc78fd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  const auth = firebase.auth();

  export const storage  = firebase.storage();

  export {auth};

  export {database};
