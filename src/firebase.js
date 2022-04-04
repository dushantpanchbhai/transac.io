// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo4suD_wcvx8m8thDP7n2HDjrYKYd1o7s",
  authDomain: "transac-io.firebaseapp.com",
  projectId: "transac-io",
  storageBucket: "transac-io.appspot.com",
  messagingSenderId: "648378988573",
  appId: "1:648378988573:web:3949a37e8e609399722ef4",
  measurementId: "G-076ZJEC5G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);