import collections from "@/persistence/collections";
import { collection, getDocs } from "firebase/firestore";
import { useMemo } from "react";
import { useEffect } from "react";
import { useContext, useState, createContext } from "react";
import { useFirestore } from "./useFirestore";

const SuppliersContext = createContext({});

const SuppliersProvider = ({ children }) => {
    const {app, db} = useFirestore();
    const [supplierDataset, setSupplierDataset] = useState([]);
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const suppliersCollection = collection(db, collections.SUPPLIERS);
                const suppliersSnapshot = await getDocs(suppliersCollection);
                const suppliersList = suppliersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSupplierDataset(suppliersList);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        }
        fetchSuppliers();
    }, [app, db]);

    const ctxValue = useMemo(() => ({
        data: supplierDataset,
        setData: setSupplierDataset
    }), [supplierDataset]);

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
