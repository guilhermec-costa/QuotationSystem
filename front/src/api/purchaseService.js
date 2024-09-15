import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import collections from "@/persistence/collections";
import { getPersistenceSetup } from "@/hooks/useFirestore";

export default class PurchaseService {
    static db = getPersistenceSetup().db;
    static purchaseCollection = collection(PurchaseService.db, collections.PURCHASES);

    static async create(productId, userId, quantity) {
        try {
            await addDoc(this.purchaseCollection, {
                productId,
                userId,
                quantity,
                status: "opened",
                createdAt: new Date()
            });
            console.log(`Purchase added successfully`);
        } catch (error) {
            console.error("Failed to add purchase:", error);
        }
    }

    static async mutateStatus(purchaseId, newStatus) {
        try {
            const existingPurchase = await this.getOne(purchaseId);
            const purchaseRef = doc(this.purchaseCollection, purchaseId);

            const newPurchase = {
                ...existingPurchase,
                status: newStatus 
            }
            await updateDoc(purchaseRef, newPurchase);
            console.log(`Product updated successfully: ${productId}`);
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    }

    static async getOne(purchaseId) {
        const purchaseDoc = await getDoc(doc(this.purchaseCollection, purchaseId));
        if(purchaseDoc.exists()) {
            return purchaseDoc.data();
        }
    }

    static async list() {
        try {
            const purchaseRequisitionSnapshot = await getDocs(this.purchaseCollection);
            const purchasesList = purchaseRequisitionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return purchasesList;
        } catch (error) {
            console.error("Failed to fetch purchase requisitions:", error);
        }
    }
}
