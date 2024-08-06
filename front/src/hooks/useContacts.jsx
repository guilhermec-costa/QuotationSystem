import { useMemo } from "react";
import { useRef } from "react";
import { useContext, useState, createContext } from "react";
import { useSuppliers } from "./useSuppliers";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore } from "./useFirestore";
import collections from "@/persistence/collections";

const ContactsContext = createContext({});

const ContactsProvider = ({ children }) => {
    const {app, db} = useFirestore();
    const [contactDataset, setContactDataset] = useState([]);
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const contactsCollection = collection(db, collections.CONTACTS);
                const contactsSnapshot = await getDocs(contactsCollection);
                const contactsList = contactsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setContactDataset(contactsList);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        }
        fetchContacts();
    }, [app, db]);

    const { data: suppliers }= useSuppliers();

    useEffect(() => {
        setContactDataset(prevContacts => {
            return prevContacts.map(contact => ({
                ...contact,
                supplierName: suppliers.find(supplier => supplier.id === contact.supplierId)?.name
            }))
        });
    }, [suppliers])

    const ctxValue = useMemo(() => ({
        data: contactDataset,
        setData: setContactDataset
    }), [contactDataset]);
    return (
        <ContactsContext.Provider value={ctxValue}>{children}</ContactsContext.Provider>
    )
}


const useContacts = () => {
    const context = useContext(ContactsContext);
    if (!context) throw new Error("useContacts must be withing a ContactsProvider")
    return context;
}

export {
    useContacts,
    ContactsProvider
}
