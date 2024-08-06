import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import collections from "@/persistence/collections";
import { getPersistenceSetup } from "@/hooks/useFirestore";

export default class SupplierService {
    static db = getPersistenceSetup().db;
    static supplierCollection = collection(SupplierService.db, collections.SUPPLIERS);

    static async list() {
        try {
            const supplierSnapshot = await getDocs(this.supplierCollection);
            const supplierList = supplierSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return supplierList;
        } catch (error) {
            console.error("Failed to fetch suppliers:", error);
            return [];
        }
    }

    static async create(supplier) {
        try {
            await addDoc(this.supplierCollection, supplier);
            console.log(`Supplier added successfully: ${supplier.name}`);
        } catch (error) {
            console.error("Failed to add supplier:", error);
        }
    }

    static async get(supplierId) {
        try {
            const supplierDoc = await getDoc(doc(this.supplierCollection, supplierId));
            if (supplierDoc.exists()) {
                return { id: supplierDoc.id, ...supplierDoc.data() };
            } else {
                console.log("No such supplier!");
                return null;
            }
        } catch (error) {
            console.error("Failed to get supplier:", error);
            return null;
        }
    }

    static async updateOne(supplierId, updatedSupplier) {
        try {
            const supplierRef = doc(this.supplierCollection, supplierId);
            await updateDoc(supplierRef, updatedSupplier);
            console.log(`Supplier updated successfully: ${supplierId}`);
        } catch (error) {
            console.error("Failed to update supplier:", error);
        }
    }

    static async delete(supplierId) {
        try {
            const supplierRef = doc(this.supplierCollection, supplier);
            await deleteDoc(supplierRef);
            console.log(`Supplier deleted successfully: ${supplier}`);
        } catch (error) {
            console.error("Failed to delete supplier:", error);
        }
    }
}
