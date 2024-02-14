// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let app: FirebaseApp | undefined = undefined;
let FIREBASE_CONFIG = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "");

if (typeof window && !getApps().length) {
  try {
    app = initializeApp(FIREBASE_CONFIG);
    console.log("Firebase initialized");
  } catch (error) {
    console.log("Firebase initialization error", error);
  }
}

export const auth = getAuth(app);
export const firestore = getFirestore(app!);
export default app;
