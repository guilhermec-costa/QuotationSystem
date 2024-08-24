import { useMemo, useEffect, useState, useContext, createContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore } from "./useFirestore";
import { useSuppliers } from "./useSuppliers";
import collections from "@/persistence/collections";
import SupplierService from "@/api/supplierService";
import ContactService from "@/api/contactService";

const ContactsContext = createContext({});

const ContactsProvider = ({ children }) => {
    const { app, db } = useFirestore();
    const [contactDataset, setContactDataset] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const fetchContacts = async () => {
        try {
            setContactDataset(await ContactService.list());
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const fetchSuppliers = async () => {
        const suppliers = await SupplierService.list();
        setSuppliers(suppliers);
    };

    useEffect(() => {
        fetchContacts();
        fetchSuppliers();
    }, [app, db]);

    useEffect(() => {
        const updateContactsWithSuppliers = () => {
            setContactDataset(prevContacts => {
                return prevContacts.map(contact => ({
                    ...contact,
                    supplierName: suppliers.find(supplier => supplier.id === contact.supplierId)?.name
                }));
            });
        };

        updateContactsWithSuppliers();
    }, [suppliers]);

    const ctxValue = useMemo(() => ({
        data: contactDataset,
        setData: (contacts) => {
            setContactDataset(contacts);
            fetchSuppliers();
        }
    }), [contactDataset, suppliers]);

    return (
        <ContactsContext.Provider value={ctxValue}>{children}</ContactsContext.Provider>
    );
};

const useContacts = () => {
    const context = useContext(ContactsContext);
    if (!context) throw new Error("useContacts must be within a ContactsProvider");
    return context;
};

export {
    useContacts,
    ContactsProvider
};
