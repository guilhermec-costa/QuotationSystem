import { useMemo } from "react";
import { useRef } from "react";
import { useContext, useState, createContext } from "react";

const ContactsContext = createContext({});

const ContactsProvider = ({ children }) => {
    const dataset = useRef(() => ([
        { id: 1, name: "Contato 1", phone: "1111-2222", email: "contato1@example.com", supplierId: 1 },
        { id: 2, name: "Contato 2", phone: "2222-3333", email: "contato2@example.com", supplierId: 2 },
        { id: 3, name: "Contato 3", phone: "3333-4444", email: "contato3@example.com", supplierId: 1 },
        { id: 4, name: "Contato 4", phone: "4444-5555", email: "contato4@example.com", supplierId: 3 },
        { id: 5, name: "Contato 5", phone: "5555-6666", email: "contato5@example.com", supplierId: 2 }
    ]));

    const [data, setData] = useState(dataset.current);
    const ctxValue = useMemo(() => ({
        data,
        setData
    }), [data]);
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
