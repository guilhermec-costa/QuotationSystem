import { firebaseConfig } from "@/env";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import React, { useContext, useMemo } from "react";

// the context should return the firebase config, and firebase db
const FirestoreContext = React.createContext({});

export const getPersistenceSetup = () =>
{
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return { app, db };
}

export const FirestoreProvider = ({ children }) => {

    const persistence = useMemo(() => {
        return getPersistenceSetup();
    }, []);

    return (
        <FirestoreContext.Provider
            value={{
                app: persistence.app,
                db: persistence.db
            }}
        >
            {children}
        </FirestoreContext.Provider>
    );
}


export const useFirestore = () => {
    const context = useContext(FirestoreContext);
    if (!context)
        console.log("\"useFirestore\" must be wrapped inside FirestoreProvider");

    return context;
}