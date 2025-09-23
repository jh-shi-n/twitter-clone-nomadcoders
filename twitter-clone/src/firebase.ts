// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD57biFIuXzhBbKhiknoiKc7m8z01Ms0qc",
  authDomain: "twitter-clone-e4bed.firebaseapp.com",
  projectId: "twitter-clone-e4bed",
  storageBucket: "twitter-clone-e4bed.firebasestorage.app",
  messagingSenderId: "440457600787",
  appId: "1:440457600787:web:e99c911608e225e8d884e6",
  measurementId: "G-THD5WZHVH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // config를 통한 app 초기화 후 생성

export const auth = getAuth(app) // app을 활용하여 인증 서비스 사용 요청

export const storage = getStorage(app)

export const db = getFirestore(app)