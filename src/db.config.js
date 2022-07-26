import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDeZbcf3bBdO3iATWnorfnEPKCPjTRocZI",
  authDomain: "sic-db-53c2a.firebaseapp.com",
  projectId: "sic-db-53c2a",
  storageBucket: "sic-db-53c2a.appspot.com",
  messagingSenderId: "122514351199",
  appId: "1:122514351199:web:42d59db75f77756376a7ea",
  measurementId: "G-CKLD3S22GJ",
  // apiKey: "AIzaSyA9ZZ_5oBbigQyC1iZvT6uXGgj93M3MpfE",
  // authDomain: "learn-fire-base-efb71.firebaseapp.com",
  // projectId: "learn-fire-base-efb71",
  // storageBucket: "learn-fire-base-efb71.appspot.com",
  // messagingSenderId: "126236039493",
  // appId: "1:126236039493:web:06b545c79fea6466c9062c"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
