import { useEffect, useMemo } from "react";
import { useRef } from "react";
import { useContext, useState, createContext } from "react";
import { useFirestore } from "./useFirestore";
import { collection, getDocs } from "firebase/firestore";
import collections from "@/persistence/collections";

const ProductContext = createContext({});

const ProductsProvider = ({ children }) => {
    const { app, db } = useFirestore();
    const [productDataset, setProductDataset] = useState([]);
    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const productsCollection = collection(db, collections.PRODUCTS);
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProductDataset(productsList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchQuotations();
    }, [app, db]);

    const ctxValue = useMemo(() => ({
        data: productDataset,
        setData: setProductDataset
    }), [productDataset]);
    return (
        <ProductContext.Provider value={ctxValue}>{children}</ProductContext.Provider>
    )
}

const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProducts must be withing a ProductsProvider")
    return context;
}

export {
    useProducts,
    ProductsProvider
}
