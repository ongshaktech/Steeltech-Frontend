import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "@firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyBCtuJRMY3TLF0pnWCUSL1jnxFOHJtZ5fE",
  authDomain: "steeltechiot.firebaseapp.com",
  databaseURL: "https://steeltechiot-default-rtdb.firebaseio.com",
  projectId: "steeltechiot",
  storageBucket: "steeltechiot.appspot.com",
  messagingSenderId: "918836431428",
  appId: "1:918836431428:web:ced95dc23e447f30d68a11",
  measurementId: "G-XE8XTNRSHB"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const db_realtime = getDatabase(app);
export const db_firestore = getFirestore(app);







