import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import collections from "@/persistence/collections";
import { getPersistenceSetup } from "@/hooks/useFirestore";

export default class ProductService {
    static db = getPersistenceSetup().db;
    static productsCollection = collection(ProductService.db, collections.PRODUCTS);

    static async list() {
        try {
            const productsSnapshot = await getDocs(this.productsCollection);
            const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return productsList;
        } catch (error) {
            console.error("Failed to fetch products:", error);
            return [];
        }
    }

    static async create(product) {
        try {
            await addDoc(this.productsCollection, product);
            console.log(`Product added successfully: ${product.name}`);
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    }

    static async get(productId) {
        try {
            const productDoc = await getDoc(doc(this.productsCollection, productId));
            if (productDoc.exists()) {
                return { id: productDoc.id, ...productDoc.data() };
            } else {
                console.log("No such product!");
                return null;
            }
        } catch (error) {
            console.error("Failed to get product:", error);
            return null;
        }
    }

    static async updateOne(productId, updatedProduct) {
        try {
            const productRef = doc(this.productsCollection, productId);
            await updateDoc(productRef, updatedProduct);
            console.log(`Product updated successfully: ${productId}`);
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    }

    static async delete(productId) {
        try {
            const productRef = doc(this.productsCollection, productId);
            await deleteDoc(productRef);
            console.log(`Product deleted successfully: ${productId}`);
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    }
}
