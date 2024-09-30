import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const configBase64 = import.meta.env.VITE_PUBLIC_FIREBASE_CONFIG;
const firebaseConfig = JSON.parse(atob(configBase64));
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
