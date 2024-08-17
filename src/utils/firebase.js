// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4s6_tvD7cZIP8q2mx-SvA2qIlBPSmM3A",
  authDomain: "namaste-food-de38b.firebaseapp.com",
  databaseURL: "https://namaste-food-de38b-default-rtdb.firebaseio.com",
  projectId: "namaste-food-de38b",
  storageBucket: "namaste-food-de38b.appspot.com",
  messagingSenderId: "708987290716",
  appId: "1:708987290716:web:472207e99537ebc7ce5299",
  measurementId: "G-E73DXBM6B8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);

export const auth = getAuth();

const fetchCartItems = async () => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, "cart"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default fetchCartItems;
