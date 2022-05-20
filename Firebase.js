// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYl2mAuYuoW73uvYVGbK6lZLTVbT63Y6w",
  authDomain: "haaminepali-16697.firebaseapp.com",
  projectId: "haaminepali-16697",
  storageBucket: "haaminepali-16697.appspot.com",
  messagingSenderId: "700334674362",
  appId: "1:700334674362:web:0aa84fbfe25d28416e8d83",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
