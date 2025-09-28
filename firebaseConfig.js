import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// --- YOUR FIREBASE CONFIGURATION GOES HERE ---
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC6AQ0fPDU-RvtUu23TZlhz8qtxbrKlEUI",
  authDomain: "tala-2zyh5z.firebaseapp.com",
  projectId: "tala-2zyh5z",
  storageBucket: "tala-2zyh5z.appspot.com",
  messagingSenderId: "172867130005",
  appId: "1:172867130005:web:dc40741a2e1f1f6845819c"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

let auth;
try {
  auth = getAuth(app);
} catch (e) {
  auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}

const db = getFirestore(app);

export { auth, db };