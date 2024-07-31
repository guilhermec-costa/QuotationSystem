import { useMemo } from "react";
import { useRef } from "react";
import { useContext, useState, createContext } from "react";
import { useProducts } from "./useProducts";
import { useEffect } from "react";
import { firebaseConfig } from "@/env";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore/lite"
import { initializeApp } from "firebase/app";

const QuotationsContext = createContext({});

const QuotationsProvider = ({ children }) => {
    const { data: products } = useProducts();
    const dataset = useRef(() => ([
        { id: 1, productId: 3, date: "2023-01-10", price: 150.00 },
        { id: 2, productId: 7, date: "2023-02-15", price: 220.50 },
        { id: 3, productId: 12, date: "2023-03-20", price: 180.75 },
        { id: 4, productId: 5, date: "2023-04-05", price: 300.00 },
        { id: 5, productId: 9, date: "2023-05-12", price: 250.25 },
        { id: 6, productId: 2, date: "2023-06-18", price: 190.50 },
        { id: 7, productId: 8, date: "2023-07-22", price: 210.00 },
        { id: 8, productId: 10, date: "2023-08-29", price: 280.80 },
        { id: 9, productId: 1, date: "2023-09-07", price: 170.00 },
        { id: 10, productId: 14, date: "2023-10-14", price: 320.50 },
        { id: 11, productId: 6, date: "2023-11-19", price: 270.25 },
        { id: 12, productId: 13, date: "2023-12-25", price: 200.00 },
        { id: 13, productId: 4, date: "2024-01-02", price: 150.75 },
        { id: 14, productId: 11, date: "2024-02-08", price: 230.50 },
        { id: 15, productId: 15, date: "2024-03-15", price: 180.00 },
        { id: 16, productId: 3, date: "2024-04-20", price: 260.00 },
        { id: 17, productId: 7, date: "2024-05-25", price: 300.50 },
        { id: 18, productId: 12, date: "2024-06-30", price: 190.25 },
        { id: 19, productId: 5, date: "2024-07-07", price: 350.00 },
        { id: 20, productId: 9, date: "2024-08-12", price: 240.75 },
    ]));

    console.log(db)
    const quotationCollection = collection(db, "quotations");
    getDocs(quotationCollection).then(dataset => {
        console.log(dataset)
    })

    const [data, setData] = useState(dataset.current);
    useEffect(() => {
        setData(prevQuotations => {
            return prevQuotations.map(quotation => ({
                ...quotation,
                productName: products.find(product => product.id === quotation.productId)?.name
            }))
        });
    }, [products])

    const ctxValue = useMemo(() => ({
        data,
        setData
    }), [data]);
    return (
        <QuotationsContext.Provider value={ctxValue}>{children}</QuotationsContext.Provider>
    )
}


const useQuotations = () => {
    const context = useContext(QuotationsContext);
    if (!context) throw new Error("useQuotations must be withing a QuotationsProvider")
    return context;
}

export {
    useQuotations,
    QuotationsProvider
}
