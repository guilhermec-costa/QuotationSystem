import { useMemo } from "react";
import { useContext, useState, createContext } from "react";
import { useEffect } from "react";
import { useFirestore } from "./useFirestore";
import ProductService from "@/api/productService";
import QuotationService from "@/api/quotationService";

const QuotationsContext = createContext({});

const QuotationsProvider = ({ children }) => {
    const { app, db } = useFirestore();
    const [quotationDataset, setQuotationDataset] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchQuotations = async () => {
        try {
            setQuotationDataset(await QuotationService.list());
        } catch (error) {
            console.error("Error fetching quotations:", error);
        }
    }

    const fetchProducts = async () => {
        const products = await ProductService.list();
        setProducts(products);
    };

    useEffect(() => {
        fetchQuotations();
        fetchProducts();
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
        setData: (quotations) => {
            setQuotationDataset(quotations);
            fetchProducts();
        }
    }), [quotationDataset, products]);

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
