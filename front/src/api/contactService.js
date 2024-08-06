import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import collections from "@/persistence/collections";
import { getPersistenceSetup } from "@/hooks/useFirestore";

export default class ContactService {
    static db = getPersistenceSetup().db;
    static contactsCollection = collection(ContactService.db, collections.CONTACTS);

    static async list() {
        try {
            const contactsSnapshot = await getDocs(this.contactsCollection);
            const contactsList = contactsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return contactsList;
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
            return [];
        }
    }

    static async create(contact) {
        try {
            await addDoc(this.contactsCollection, contact);
            console.log(`Contact added successfully: ${contact.name}`);
        } catch (error) {
            console.error("Failed to add contact:", error);
        }
    }

    static async get(contactId) {
        try {
            const contactDoc = await getDoc(doc(this.contactsCollection, contactId));
            if (contactDoc.exists()) {
                return { id: contactDoc.id, ...contactDoc.data() };
            } else {
                console.log("No such contact!");
                return null;
            }
        } catch (error) {
            console.error("Failed to get contact:", error);
            return null;
        }
    }

    static async updateOne(contactId, updatedContact) {
        try {
            const contactRef = doc(this.contactsCollection, contactId);
            await updateDoc(contactRef, updatedContact);
            console.log(`Contact updated successfully: ${contactId}`);
        } catch (error) {
            console.error("Failed to update contact:", error);
        }
    }

    static async delete(contactId) {
        try {
            const contactRef = doc(this.contactsCollection, contactId);
            await deleteDoc(contactRef);
            console.log(`Contact deleted successfully: ${contactId}`);
        } catch (error) {
            console.error("Failed to delete contact:", error);
        }
    }
}
