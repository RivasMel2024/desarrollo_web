// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAzX0T66kqgoreHV7Q5aFZ144WC4GzRk2A",
authDomain: "proyecto-recetas-9da05.firebaseapp.com",
projectId: "proyecto-recetas-9da05",
storageBucket: "proyecto-recetas-9da05.firebasestorage.app",
messagingSenderId: "743361680979",
appId: "1:743361680979:web:a6d93a9b5987894e5ed8a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
    