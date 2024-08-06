import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import collections from "@/persistence/collections";
import { getPersistenceSetup } from "@/hooks/useFirestore";

export default class QuotationService {
    static db = getPersistenceSetup().db;
    static quotationsCollection = collection(QuotationService.db, collections.QUOTATIONS);

    static async list() {
        try {
            const quotationsSnapshot = await getDocs(this.quotationsCollection);
            const quotationsList = quotationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return quotationsList;
        } catch (error) {
            console.error("Failed to fetch quotations:", error);
            return [];
        }
    }

    static async create(quotation) {
        try {
            await addDoc(this.quotationsCollection, quotation);
            console.log(`Quotation added successfully: `);
        } catch (error) {
            console.error("Failed to add quotation:", error);
        }
    }

    static async get(quotationId) {
        try {
            const quotationDoc = await getDoc(doc(this.quotationsCollection, quotationId));
            if (quotationDoc.exists()) {
                return { id: quotationDoc.id, ...quotationDoc.data() };
            } else {
                console.log("No such quotation!");
                return null;
            }
        } catch (error) {
            console.error("Failed to get quotation:", error);
            return null;
        }
    }

    static async updateOne(quotationId, updatedQuotation) {
        try {
            const quotationRef = doc(this.quotationsCollection, quotationId);
            await updateDoc(quotationRef, updatedQuotation);
            console.log(`Quotation updated successfully: ${quotationId}`);
        } catch (error) {
            console.error("Failed to update quotation:", error);
        }
    }

    static async delete(quotationId) {
        try {
            const quotationRef = doc(this.quotationsCollection, quotationId);
            await deleteDoc(quotationRef);
            console.log(`Quotation deleted successfully: ${quotationId}`);
        } catch (error) {
            console.error("Failed to delete quotation:", error);
        }
    }
}
