import { useMemo } from "react";
import { useContext, useState, createContext } from "react";
import { useProducts } from "./useProducts";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore } from "./useFirestore";
import collections from "@/persistence/collections";

const QuotationsContext = createContext({});

const QuotationsProvider = ({ children }) => {
    const { app, db } = useFirestore();
    const [quotationDataset, setQuotationDataset] = useState([]);
    const { data: products } = useProducts();
    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const quotationsCollection = collection(db, collections.QUOTATIONS);
                const quotationsSnapshot = await getDocs(quotationsCollection);
                const quotationsList = quotationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setQuotationDataset(quotationsList);
            } catch (error) {
                console.error("Error fetching quotations:", error);
            }
        }
        fetchQuotations();
    }, [app, db]);

    useEffect(() => {
        setQuotationDataset(prevQuotations => {
            return prevQuotations.map(quotation => ({
                ...quotation,
                productName: products.find(product => product.id === quotation.productId)?.name
            }))
        });
    }, [products])

    const ctxValue = useMemo(() => ({
        data: quotationDataset,
        setData: setQuotationDataset
    }), [quotationDataset]);
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
