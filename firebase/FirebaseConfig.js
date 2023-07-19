import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANtXvfmeIxMMzBN8ycXJcBM6NohdEIoyY",
  authDomain: "fir-auth-todo-ca406.firebaseapp.com",
  projectId: "fir-auth-todo-ca406",
  storageBucket: "fir-auth-todo-ca406.appspot.com",
  messagingSenderId: "786979644742",
  appId: "1:786979644742:web:076746b2a3853b2db2b147",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
