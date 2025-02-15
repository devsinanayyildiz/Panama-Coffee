import { initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';

// 🔥 Firebase Yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyAnU-4HsgUnz2CMbkF4MDxclArD2EgbHj8",
  authDomain: "panama-2d429.firebaseapp.com",
  projectId: "panama-2d429",
  storageBucket: "panama-2d429.appspot.com",
  messagingSenderId: "409055452730",
  appId: "1:409055452730:android:8fa9e4201bcd6b60489f03"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // ✅ auth burada doğru tanımlandı

export { app, auth };