import admin from "firebase-admin";

let FIREBASE_SERVICE_ACCOUNT = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT || ""
);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
      databaseURL: `https://${FIREBASE_SERVICE_ACCOUNT.project_id}.firebaseio.com`
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error);
  }
}

export default admin;
