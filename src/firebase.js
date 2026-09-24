import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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

export { app, analytics, db };