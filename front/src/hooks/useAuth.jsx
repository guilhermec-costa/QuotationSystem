import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { firebaseConfig } from "../env";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useMemo } from "react";
import { notifyError, notifySuccess } from "@/components/ui/Toast/Toasters";
import UserService from "@/api/userService";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        return JSON.parse(localStorage.getItem("userData")) || {}
    });
    const [authHandler, setAuthHandler] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        initializeApp(firebaseConfig);
        setAuthHandler(getAuth());
    }, []);

    const checkIsAdmin = (email) => {
        const pattern = /adm|admin|administrator/i
        return pattern.test(email);
    };

    const getIsAdmin = () => {
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        return isAdmin;
    }

    const login = async (credentials) => {
        const { email, password } = credentials;
        try {
            let response = await signInWithEmailAndPassword(authHandler, email, password);
            if (response.user.uid) {
                setIsLogged(true);
                setUserData(response.user);
                localStorage.setItem("userData", JSON.stringify(response.user));

                const hasAdministration = checkIsAdmin(response.user.email);
                localStorage.setItem("isAdmin", hasAdministration)

                setIsAdmin(hasAdministration);
                response = {
                    ...response,
                    hasAdmin: hasAdministration
                }
                return response;
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    const logout = async () => {
        await signOut(authHandler);
        localStorage.removeItem("userData");
        localStorage.removeItem("isAdmin")
        setUserData({});
        setIsLogged(false);
    }

    const recoverPassword = async (email) => {
        try {
            await sendPasswordResetEmail(authHandler, email)
        } catch (err) {
            notifyError(err.message);
        }
    }

    const createAccount = async (credentials) => {
        const { email, password } = credentials;
        try {
            await createUserWithEmailAndPassword(authHandler, email, password);
            await UserService.create({ email, status: "Active" });
            notifySuccess("Account created");
        } catch (err) {
            notifyError(err.message);
        }
    }

    const ctxValue = useMemo(() => ({
        userData,
        setUserData,
        createAccount,
        login,
        logout,
        recoverPassword,
        isLogged,
        getIsAdmin
    }), [userData, login]);

    return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be wrapped inside an AuthProvider");
    }

    return context;
}

export {
    useAuth,
    AuthContext
}
