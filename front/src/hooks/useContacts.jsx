import { useMemo } from "react";
import { useRef } from "react";
import { useContext, useState, createContext } from "react";
import { useSuppliers } from "./useSuppliers";
import { useEffect } from "react";

const ContactsContext = createContext({});

const ContactsProvider = ({ children }) => {
    const { data: suppliers }= useSuppliers();
    const dataset = useRef(() => ([
        {
            "id": 1,
            "supplierId": 1,
            "name": "Contato A1",
            "phone": "1234-5678",
            "email": "contatoA1@example.com"
        },
        {
            "id": 2,
            "supplierId": 1,
            "name": "Contato A2",
            "phone": "1234-5679",
            "email": "contatoA2@example.com"
        },
        {
            "id": 3,
            "supplierId": 2,
            "name": "Contato B1",
            "phone": "2345-6789",
            "email": "contatoB1@example.com"
        },
        {
            "id": 4,
            "supplierId": 2,
            "name": "Contato B2",
            "phone": "2345-6790",
            "email": "contatoB2@example.com"
        },
        {
            "id": 5,
            "supplierId": 3,
            "name": "Contato C1",
            "phone": "3456-7890",
            "email": "contatoC1@example.com"
        },
        {
            "id": 6,
            "supplierId": 3,
            "name": "Contato C2",
            "phone": "3456-7891",
            "email": "contatoC2@example.com"
        },
        {
            "id": 7,
            "supplierId": 4,
            "name": "Contato D1",
            "phone": "4567-8901",
            "email": "contatoD1@example.com"
        },
        {
            "id": 8,
            "supplierId": 4,
            "name": "Contato D2",
            "phone": "4567-8902",
            "email": "contatoD2@example.com"
        },
        {
            "id": 9,
            "supplierId": 5,
            "name": "Contato E1",
            "phone": "5678-9012",
            "email": "contatoE1@example.com"
        },
        {
            "id": 10,
            "supplierId": 5,
            "name": "Contato E2",
            "phone": "5678-9013",
            "email": "contatoE2@example.com"
        },
        {
            "id": 11,
            "supplierId": 6,
            "name": "Contato F1",
            "phone": "6789-0123",
            "email": "contatoF1@example.com"
        },
        {
            "id": 12,
            "supplierId": 6,
            "name": "Contato F2",
            "phone": "6789-0124",
            "email": "contatoF2@example.com"
        },
        {
            "id": 13,
            "supplierId": 7,
            "name": "Contato G1",
            "phone": "7890-1234",
            "email": "contatoG1@example.com"
        },
        {
            "id": 14,
            "supplierId": 7,
            "name": "Contato G2",
            "phone": "7890-1235",
            "email": "contatoG2@example.com"
        },
        {
            "id": 15,
            "supplierId": 8,
            "name": "Contato H1",
            "phone": "8901-2345",
            "email": "contatoH1@example.com"
        },
        {
            "id": 16,
            "supplierId": 9,
            "name": "Contato I3",
            "phone": "8812-1956",
            "email": "contatoI3@example.com"
        },
    ]));

    const [data, setData] = useState(dataset.current);
    useEffect(() => {
        setData(prevContacts => {
            return prevContacts.map(contact => ({
                ...contact,
                supplierName: suppliers.find(supplier => supplier.id === contact.supplierId)?.name
            }))
        });
    }, [suppliers])

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
