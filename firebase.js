import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZfxLRP13nCSvdzKpF1wtd-Ck-yHCWhqY",
  authDomain: "nottrello-b49bd.firebaseapp.com",
  projectId: "nottrello-b49bd",
  storageBucket: "nottrello-b49bd.appspot.com",
  messagingSenderId: "593111145549",
  appId: "1:593111145549:web:b448acce9ed8f8c2dbd004"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const androidClientId = '593111145549-9jtgvktjhiq6rpcmbg1iipoecse560dp.apps.googleusercontent.com';

export { auth, db, androidClientId };