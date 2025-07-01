// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth" //auth
import { getStorage } from "firebase/storage"; //pics/vid
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"; //functions

// Configuración usando variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // ojo aquí
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Inicializar Analytics (opcional)
const analytics = getAnalytics(app);

//iniciar auth
const auth = getAuth(app);

//crear para storage/pics/videos
const storage = getStorage(app);

// Inicializar Functions
const functions = getFunctions(app);

//connect to emulator
if(window.location.hostname === "localhost"){
  connectFunctionsEmulator(functions, "localholst", 5001)
}

// Exportar la base de datos, auth, storage, y functions
export { db, auth, storage, functions };