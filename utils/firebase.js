// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_u3Jwsa6-ynVoBYKNL2793p8t6ywsKRs",
  authDomain: "authapp-61a7e.firebaseapp.com",
  projectId: "authapp-61a7e",
  storageBucket: "authapp-61a7e.appspot.com",
  messagingSenderId: "824245934538",
  appId: "1:824245934538:web:53592e8df86894f1bb1733"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const storage = getStorage(app);