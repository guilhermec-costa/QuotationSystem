import { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { useContext, useState, createContext } from "react";
import { useFirestore } from "./useFirestore";
import PurchaseService from "@/api/purchaseService";
import ProductService from "@/api/productService";
import UserService from "@/api/userService";

const PurchaseRequisitionContext = createContext({});

export const getFormmatedPurchases = async () => {
    try {
        const productList = await ProductService.list();
        const userList = await UserService.list();
        const purchaseList = await PurchaseService.list();
        const updatedPurchaseList = purchaseList.map(purchase => ({
            ...purchase,
            productName: productList.find(product => product.id === purchase.productId)?.name,
            userName: userList.find(user => user.id === purchase.userId)?.email
        }));
        return updatedPurchaseList;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

const PurchaseRequisitionProvider = ({ children }) => {
    const { app, db } = useFirestore();
    const [purchaseDataset, setPurchaseDataset] = useState([]);

    useEffect(() => {
        getFormmatedPurchases()
            .then(data => setPurchaseDataset(data));
    }, [app, db]);

    const ctxValue = useMemo(() => ({
        data: purchaseDataset,
        setData: setPurchaseDataset
    }), [purchaseDataset]);

    return (
        <PurchaseRequisitionContext.Provider value={ctxValue}>{children}</PurchaseRequisitionContext.Provider>
    )
}


const usePurchaseRequisition = () => {
    const context = useContext(PurchaseRequisitionContext);
    if (!context) throw new Error("usePurchaseRequisition must be withing a PurchaseRequisitionProvider")
    return context;
}

export {
    usePurchaseRequisition,
    PurchaseRequisitionProvider
}
