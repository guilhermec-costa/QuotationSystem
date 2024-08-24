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
            console.log(`Purchase added successfully: ${contact.name}`);
        } catch (error) {
            console.error("Failed to add purchase:", error);
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
