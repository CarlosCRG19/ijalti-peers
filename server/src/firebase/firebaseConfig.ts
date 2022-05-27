import admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SDK_CREDENTIAL!))
})

const auth = admin.auth()

export {admin, auth};