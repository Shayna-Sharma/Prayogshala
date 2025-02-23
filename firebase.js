// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/Firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDONf26oxVzfbJkyzfMfpDpB_poxyhft60",
    authDomain: "prayogshala-fe484.firebaseapp.com",
    projectId: "prayogshala-fe484",
    storageBucket: "prayogshala-fe484.firebasestorage.app",
    messagingSenderId: "610710994267",
    appId: "1:610710994267:web:223deecae87a39a3162e7e",
    measurementId: "G-SZ6E610W4B"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add data to Firestore
async function addExperiment() {
    try {
        const docRef = await addDoc(collection(db, "experiments"), {
            name: "Physics Simulation",
            description: "A simple physics experiment"
        });
        console.log("Document written with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding document:", error);
    }
}
