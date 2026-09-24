import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyCaZlDtMsVcrmmPK9K836K4ocnu-RE1x84",
    authDomain: "fininsight-paytm.firebaseapp.com",
    projectId: "fininsight-paytm",
    storageBucket: "fininsight-paytm.firebasestorage.app",
    messagingSenderId: "919691132807",
    appId: "1:919691132807:web:85cf176f88e06f97a75d22",
    measurementId: "G-SF7W1J75HG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const functions = getFunctions(app, "us-central1");

// Connect to Firebase Functions local emulator during development
if (
  import.meta.env.DEV ||
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
) {
  connectFunctionsEmulator(functions, "127.0.0.1", 5005);
}

export { app, analytics, db, functions };