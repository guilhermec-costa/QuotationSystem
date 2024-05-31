import { z } from "zod";

const envSchema = z.object({
    VITE_REACT_APP_FIREBASE_API_KEY: z.string(),
    VITE_REACT_APP_FIREBASE_AUTH_DOMAIN: z.string(),
    VITE_REACT_APP_FIREBASE_PROJECT_ID: z.string(),
    VITE_REACT_APP_FIREBASE_STORAGE_BUCKET: z.string(),
    VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID: z.string(),
    VITE_REACT_APP_FIREBASE_APP_ID: z.string(),
    VITE_REACT_APP_FIREBASE_MEASUREMENT_ID: z.string()
})

export const env = envSchema.parse(import.meta.env)
export const firebaseConfig = {
    apiKey: env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_REACT_APP_FIREBASE_APP_ID,
    measurementId: env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID
}
