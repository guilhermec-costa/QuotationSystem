import { useMemo } from "react";
import { useEffect } from "react";
import { useContext, useState, createContext } from "react";
import { useFirestore } from "./useFirestore";
import UserService from "@/api/userService";
import { data } from "autoprefixer";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const { app, db } = useFirestore();
    const [userDataset, setUserDataset] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await UserService.list();
                setUserDataset(userList);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, [app, db]);

    const ctxValue = useMemo(() => ({
        data: userDataset,
        setData: setUserDataset
    }), [userDataset]);

    return (
        <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
    )
}


const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUsers must be withing a UserProvider")
    return context;
}

export {
    useUsers,
    UserProvider
}
