import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA8zvOF-Cd8hTCXiVYJmMMOjDYqxZP9M68",
    authDomain: "react-firestore-react.firebaseapp.com",
    projectId: "react-firestore-react",
    storageBucket: "react-firestore-react.appspot.com",
    messagingSenderId: "198550303171",
    appId: "1:198550303171:web:20280ff5991a15bbb9cd76"
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);