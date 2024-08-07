import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, addDoc, collection, getDocs } from 'firebase/firestore';

config();  // Carregar variáveis de ambiente do arquivo .process.env

export const firebaseConfig = {
    apiKey: process.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const quotationRef = collection(db, 'quotations');
const supplierRef = collection(db, 'suppliers');
const contactRef = collection(db, 'contacts');
const productRef = collection(db, 'products');

// Dados de exemplo
const suppliers = [
    {
        "name": "Fornecedor A",
        "address": "Rua A, 123",
        "phone": "1234-5678",
        "email": "fornecedorA@example.com"
    },
    {
        "name": "Fornecedor B",
        "address": "Rua B, 456",
        "phone": "2345-6789",
        "email": "fornecedorB@example.com"
    },
    {
        "name": "Fornecedor C",
        "address": "Rua C, 789",
        "phone": "3456-7890",
        "email": "fornecedorC@example.com"
    },
    {
        "name": "Fornecedor D",
        "address": "Rua D, 101",
        "phone": "4567-8901",
        "email": "fornecedorD@example.com"
    },
    {
        "name": "Fornecedor E",
        "address": "Rua E, 202",
        "phone": "5678-9012",
        "email": "fornecedorE@example.com"
    },
    {
        "name": "Fornecedor F",
        "address": "Rua F, 303",
        "phone": "6789-0123",
        "email": "fornecedorF@example.com"
    },
    {
        "name": "Fornecedor G",
        "address": "Rua G, 404",
        "phone": "7890-1234",
        "email": "fornecedorG@example.com"
    },
    {
        "name": "Fornecedor H",
        "address": "Rua H, 505",
        "phone": "8901-2345",
        "email": "fornecedorH@example.com"
    },
    {
        "name": "Fornecedor I",
        "address": "Rua I, 606",
        "phone": "9012-3456",
        "email": "fornecedorI@example.com"
    },
    {
        "name": "Fornecedor J",
        "address": "Rua J, 707",
        "phone": "0123-4567",
        "email": "fornecedorJ@example.com"
    },
    {
        "name": "Fornecedor K",
        "address": "Rua K, 808",
        "phone": "1234-5678",
        "email": "fornecedorK@example.com"
    },
    {
        "name": "Fornecedor L",
        "address": "Rua L, 909",
        "phone": "2345-6789",
        "email": "fornecedorL@example.com"
    },
    {
        "name": "Fornecedor M",
        "address": "Rua M, 1010",
        "phone": "3456-7890",
        "email": "fornecedorM@example.com"
    },
    {
        "name": "Fornecedor N",
        "address": "Rua N, 1111",
        "phone": "4567-8901",
        "email": "fornecedorN@example.com"
    },
    {
        "name": "Fornecedor O",
        "address": "Rua O, 1212",
        "phone": "5678-9012",
        "email": "fornecedorO@example.com"
    }
];

for (const supplier of suppliers) {
    await addDoc(supplierRef, supplier)
}

const products = [
    {
        name: "Keyboard",
        description: "A mechanical keyboard",
        price: 100,
        quantity: 5,
        status: "In Stock"
    },
    {
        name: "Mouse",
        description: "A wireless mouse",
        price: 50,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        name: "Monitor",
        description: "A 24-inch monitor",
        price: 200,
        quantity: 3,
        status: "In Stock"
    },
    {
        name: "USB Cable",
        description: "A 2-meter USB-C cable",
        price: 15,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        name: "Laptop",
        description: "A 15-inch laptop",
        price: 1500,
        quantity: 2,
        status: "In Stock"
    },
    {
        name: "Desk Lamp",
        description: "An adjustable desk lamp",
        price: 30,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        name: "Headphones",
        description: "Noise-canceling headphones",
        price: 120,
        quantity: 7,
        status: "In Stock"
    },
    {
        name: "Mouse Pad",
        description: "A large mouse pad",
        price: 10,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        name: "Webcam",
        description: "A 1080p webcam",
        price: 70,
        quantity: 8,
        status: "In Stock"
    },
    {
        name: "Smartphone",
        description: "A latest model smartphone",
        price: 800,
        quantity: 4,
        status: "Out of Stock"
    },
    {
        name: "Tablet",
        description: "A 10-inch tablet",
        price: 600,
        quantity: 0,
        status: "In Stock"
    },
    {
        name: "Charger",
        description: "A fast charger",
        price: 25,
        quantity: 30,
        status: "Out of Stock"
    },
    {
        name: "Printer",
        description: "A color printer",
        price: 250,
        quantity: 1,
        status: "In Stock"
    },
    {
        name: "Speakers",
        description: "Bluetooth speakers",
        price: 80,
        quantity: 12,
        status: "Out of Stock"
    },
    {
        name: "External Hard Drive",
        description: "1TB external hard drive",
        price: 100,
        quantity: 1,
        status: "In Stock"
    }
];

for (const product of products) {
    await addDoc(productRef, product)
}

let contacts = [
    {
        "name": "Contato A1",
        "phone": "1234-5678",
        "email": "contatoA1@example.com"
    },
    {
        "name": "Contato A2",
        "phone": "1234-5679",
        "email": "contatoA2@example.com"
    },
    {
        "name": "Contato B1",
        "phone": "2345-6789",
        "email": "contatoB1@example.com"
    },
    {
        "name": "Contato B2",
        "phone": "2345-6790",
        "email": "contatoB2@example.com"
    },
    {
        "name": "Contato C1",
        "phone": "3456-7890",
        "email": "contatoC1@example.com"
    },
    {
        "name": "Contato C2",
        "phone": "3456-7891",
        "email": "contatoC2@example.com"
    },
    {
        "name": "Contato D1",
        "phone": "4567-8901",
        "email": "contatoD1@example.com"
    },
    {
        "name": "Contato D2",
        "phone": "4567-8902",
        "email": "contatoD2@example.com"
    },
    {
        "name": "Contato E1",
        "phone": "5678-9012",
        "email": "contatoE1@example.com"
    },
    {
        "name": "Contato E2",
        "phone": "5678-9013",
        "email": "contatoE2@example.com"
    },
    {
        "name": "Contato F1",
        "phone": "6789-0123",
        "email": "contatoF1@example.com"
    },
    {
        "name": "Contato F2",
        "phone": "6789-0124",
        "email": "contatoF2@example.com"
    },
    {
        "name": "Contato G1",
        "phone": "7890-1234",
        "email": "contatoG1@example.com"
    },
    {
        "name": "Contato G2",
        "phone": "7890-1235",
        "email": "contatoG2@example.com"
    },
    {
        "name": "Contato H1",
        "phone": "8901-2345",
        "email": "contatoH1@example.com"
    },
    {
        "name": "Contato I3",
        "phone": "8812-1956",
        "email": "contatoI3@example.com"
    }
]
const suppliersCollection = collection(db, "suppliers");
const supplierSnapshot = await getDocs(suppliersCollection);
const supplierList = supplierSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
const suppliersIds = supplierList.map(supplier => supplier.id);

contacts = contacts.map(contact => {
    return {
        ...contact,
        supplierId: suppliersIds[Math.round(Math.random() * suppliersIds.length)]
    }
})

for (const contact of contacts) {
    await addDoc(contactRef, contact )
}

let quotations = [
    { date: "2023-01-10", price: 150.00 },
    { date: "2023-02-15", price: 220.50 },
    { date: "2023-03-20", price: 180.75 },
    { date: "2023-04-05", price: 300.00 },
    { date: "2023-05-12", price: 250.25 },
    { date: "2023-06-18", price: 190.50 },
    { date: "2023-07-22", price: 210.00 },
    { date: "2023-08-29", price: 280.80 },
    { date: "2023-09-07", price: 170.00 },
    { date: "2023-10-14", price: 320.50 },
    { date: "2023-11-19", price: 270.25 },
    { date: "2023-12-25", price: 200.00 },
    { date: "2024-01-02", price: 150.75 },
    { date: "2024-02-08", price: 230.50 },
    { date: "2024-03-15", price: 180.00 },
    { date: "2024-04-20", price: 260.00 },
    { date: "2024-05-25", price: 300.50 },
    { date: "2024-06-30", price: 190.25 },
    { date: "2024-07-07", price: 350.00 },
    { date: "2024-08-12", price: 240.75 },
];

const productCollection = collection(db, "products");
const productSnapshot = await getDocs(productCollection);
const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
const productIds = productList.map(product => product.id);

quotations = quotations.map(quotation => {
    return {
        ...quotation,
        productId: productIds[Math.round(Math.random() * productIds.length)]
    }
})
for (const quotation of quotations) {
    await addDoc(quotationRef, quotation)
}

console.log("setup done")
