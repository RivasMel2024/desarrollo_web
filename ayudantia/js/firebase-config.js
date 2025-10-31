// ============================================
// 🔥 CONFIGURACIÓN DE FIREBASE
// ============================================
// Este archivo conecta tu HTML con Firebase
// Solo necesitas configurarlo UNA VEZ

// 1️⃣ Importar las funciones de Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJrG4WMqxNhSjMVZWfpdrQDvFmdP3vBzM",
  authDomain: "fir-firebase-7fd06.firebaseapp.com",
  projectId: "fir-firebase-7fd06",
  storageBucket: "fir-firebase-7fd06.firebasestorage.app",
  messagingSenderId: "467256241033",
  appId: "1:467256241033:web:37e41014f78222c1dd0f58",
  measurementId: "G-0193E41Z87"
};

// 3️⃣ Inicializar Firebase con tu configuración
const app = initializeApp(firebaseConfig);

// 4️⃣ Obtener servicios de Firebase
const analytics = getAnalytics(app); // Para estadísticas (opcional)
const db = getFirestore(app); // Para la base de datos Firestore

// 5️⃣ Exportar para usar en otros archivos JavaScript
export { app, analytics, db };