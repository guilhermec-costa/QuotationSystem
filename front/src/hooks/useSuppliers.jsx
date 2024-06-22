import { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext, useState, createContext } from "react";

const SuppliersContext = createContext({});

const SuppliersProvider = ({ children }) => {
    const dataset = useRef(() => ([
        {
            "id": 1,
            "name": "Fornecedor A",
            "address": "Rua A, 123",
            "phone": "1234-5678",
            "email": "fornecedorA@example.com"
        },
        {
            "id": 2,
            "name": "Fornecedor B",
            "address": "Rua B, 456",
            "phone": "2345-6789",
            "email": "fornecedorB@example.com"
        },
        {
            "id": 3,
            "name": "Fornecedor C",
            "address": "Rua C, 789",
            "phone": "3456-7890",
            "email": "fornecedorC@example.com"
        },
        {
            "id": 4,
            "name": "Fornecedor D",
            "address": "Rua D, 101",
            "phone": "4567-8901",
            "email": "fornecedorD@example.com"
        },
        {
            "id": 5,
            "name": "Fornecedor E",
            "address": "Rua E, 202",
            "phone": "5678-9012",
            "email": "fornecedorE@example.com"
        },
        {
            "id": 6,
            "name": "Fornecedor F",
            "address": "Rua F, 303",
            "phone": "6789-0123",
            "email": "fornecedorF@example.com"
        },
        {
            "id": 7,
            "name": "Fornecedor G",
            "address": "Rua G, 404",
            "phone": "7890-1234",
            "email": "fornecedorG@example.com"
        },
        {
            "id": 8,
            "name": "Fornecedor H",
            "address": "Rua H, 505",
            "phone": "8901-2345",
            "email": "fornecedorH@example.com"
        },
        {
            "id": 9,
            "name": "Fornecedor I",
            "address": "Rua I, 606",
            "phone": "9012-3456",
            "email": "fornecedorI@example.com"
        },
        {
            "id": 10,
            "name": "Fornecedor J",
            "address": "Rua J, 707",
            "phone": "0123-4567",
            "email": "fornecedorJ@example.com"
        },
        {
            "id": 11,
            "name": "Fornecedor K",
            "address": "Rua K, 808",
            "phone": "1234-5678",
            "email": "fornecedorK@example.com"
        },
        {
            "id": 12,
            "name": "Fornecedor L",
            "address": "Rua L, 909",
            "phone": "2345-6789",
            "email": "fornecedorL@example.com"
        },
        {
            "id": 13,
            "name": "Fornecedor M",
            "address": "Rua M, 1010",
            "phone": "3456-7890",
            "email": "fornecedorM@example.com"
        },
        {
            "id": 14,
            "name": "Fornecedor N",
            "address": "Rua N, 1111",
            "phone": "4567-8901",
            "email": "fornecedorN@example.com"
        },
        {
            "id": 15,
            "name": "Fornecedor O",
            "address": "Rua O, 1212",
            "phone": "5678-9012",
            "email": "fornecedorO@example.com"
        }
    ]));

    const [data, setData] = useState(dataset.current);
    const ctxValue = useMemo(() => ({
        data,
        setData
    }), [data]);

    return (
        <SuppliersContext.Provider value={ctxValue}>{children}</SuppliersContext.Provider>
    )
}


const useSuppliers = () => {
    const context = useContext(SuppliersContext);
    if (!context) throw new Error("useSuppliers must be withing a SuppliersProvider")
    return context;
}

export {
    useSuppliers,
    SuppliersProvider
}
