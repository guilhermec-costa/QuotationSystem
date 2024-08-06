import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

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

// Dados de exemplo
const suppliers = [
    {
        "id": 1,
        "name": "Fornecedor A",
        "address": "Rua A, 123",
        "phone": "1234-5678",
        "email": "fornecedorA@example.com"
    },
    {
        "id": 2,
        "name": "Fornecedor B",
        "address": "Rua B, 456",
        "phone": "2345-6789",
        "email": "fornecedorB@example.com"
    },
    {
        "id": 3,
        "name": "Fornecedor C",
        "address": "Rua C, 789",
        "phone": "3456-7890",
        "email": "fornecedorC@example.com"
    },
    {
        "id": 4,
        "name": "Fornecedor D",
        "address": "Rua D, 101",
        "phone": "4567-8901",
        "email": "fornecedorD@example.com"
    },
    {
        "id": 5,
        "name": "Fornecedor E",
        "address": "Rua E, 202",
        "phone": "5678-9012",
        "email": "fornecedorE@example.com"
    },
    {
        "id": 6,
        "name": "Fornecedor F",
        "address": "Rua F, 303",
        "phone": "6789-0123",
        "email": "fornecedorF@example.com"
    },
    {
        "id": 7,
        "name": "Fornecedor G",
        "address": "Rua G, 404",
        "phone": "7890-1234",
        "email": "fornecedorG@example.com"
    },
    {
        "id": 8,
        "name": "Fornecedor H",
        "address": "Rua H, 505",
        "phone": "8901-2345",
        "email": "fornecedorH@example.com"
    },
    {
        "id": 9,
        "name": "Fornecedor I",
        "address": "Rua I, 606",
        "phone": "9012-3456",
        "email": "fornecedorI@example.com"
    },
    {
        "id": 10,
        "name": "Fornecedor J",
        "address": "Rua J, 707",
        "phone": "0123-4567",
        "email": "fornecedorJ@example.com"
    },
    {
        "id": 11,
        "name": "Fornecedor K",
        "address": "Rua K, 808",
        "phone": "1234-5678",
        "email": "fornecedorK@example.com"
    },
    {
        "id": 12,
        "name": "Fornecedor L",
        "address": "Rua L, 909",
        "phone": "2345-6789",
        "email": "fornecedorL@example.com"
    },
    {
        "id": 13,
        "name": "Fornecedor M",
        "address": "Rua M, 1010",
        "phone": "3456-7890",
        "email": "fornecedorM@example.com"
    },
    {
        "id": 14,
        "name": "Fornecedor N",
        "address": "Rua N, 1111",
        "phone": "4567-8901",
        "email": "fornecedorN@example.com"
    },
    {
        "id": 15,
        "name": "Fornecedor O",
        "address": "Rua O, 1212",
        "phone": "5678-9012",
        "email": "fornecedorO@example.com"
    }
];

const products = [
    {
        id: 1,
        name: "Keyboard",
        description: "A mechanical keyboard",
        price: 100,
        quantity: 5,
        status: "In Stock"
    },
    {
        id: 2,
        name: "Mouse",
        description: "A wireless mouse",
        price: 50,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        id: 3,
        name: "Monitor",
        description: "A 24-inch monitor",
        price: 200,
        quantity: 3,
        status: "In Stock"
    },
    {
        id: 4,
        name: "USB Cable",
        description: "A 2-meter USB-C cable",
        price: 15,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        id: 5,
        name: "Laptop",
        description: "A 15-inch laptop",
        price: 1500,
        quantity: 2,
        status: "In Stock"
    },
    {
        id: 6,
        name: "Desk Lamp",
        description: "An adjustable desk lamp",
        price: 30,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        id: 7,
        name: "Headphones",
        description: "Noise-canceling headphones",
        price: 120,
        quantity: 7,
        status: "In Stock"
    },
    {
        id: 8,
        name: "Mouse Pad",
        description: "A large mouse pad",
        price: 10,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        id: 9,
        name: "Webcam",
        description: "A 1080p webcam",
        price: 70,
        quantity: 8,
        status: "In Stock"
    },
    {
        id: 10,
        name: "Smartphone",
        description: "A latest model smartphone",
        price: 800,
        quantity: 4,
        status: "Out of Stock"
    },
    {
        id: 11,
        name: "Tablet",
        description: "A 10-inch tablet",
        price: 600,
        quantity: 0,
        status: "In Stock"
    },
    {
        id: 12,
        name: "Charger",
        description: "A fast charger",
        price: 25,
        quantity: 30,
        status: "Out of Stock"
    },
    {
        id: 13,
        name: "Printer",
        description: "A color printer",
        price: 250,
        quantity: 1,
        status: "In Stock"
    },
    {
        id: 14,
        name: "Speakers",
        description: "Bluetooth speakers",
        price: 80,
        quantity: 12,
        status: "Out of Stock"
    },
    {
        id: 15,
        name: "External Hard Drive",
        description: "1TB external hard drive",
        price: 100,
        quantity: 0,
        status: "In Stock"
    }
];

const contacts = [
    {
        "id": 1,
        "supplierId": 1,
        "name": "Contato A1",
        "phone": "1234-5678",
        "email": "contatoA1@example.com"
    },
    {
        "id": 2,
        "supplierId": 1,
        "name": "Contato A2",
        "phone": "1234-5679",
        "email": "contatoA2@example.com"
    },
    {
        "id": 3,
        "supplierId": 2,
        "name": "Contato B1",
        "phone": "2345-6789",
        "email": "contatoB1@example.com"
    },
    {
        "id": 4,
        "supplierId": 2,
        "name": "Contato B2",
        "phone": "2345-6790",
        "email": "contatoB2@example.com"
    },
    {
        "id": 5,
        "supplierId": 3,
        "name": "Contato C1",
        "phone": "3456-7890",
        "email": "contatoC1@example.com"
    },
    {
        "id": 6,
        "supplierId": 3,
        "name": "Contato C2",
        "phone": "3456-7891",
        "email": "contatoC2@example.com"
    },
    {
        "id": 7,
        "supplierId": 4,
        "name": "Contato D1",
        "phone": "4567-8901",
        "email": "contatoD1@example.com"
    },
    {
        "id": 8,
        "supplierId": 4,
        "name": "Contato D2",
        "phone": "4567-8902",
        "email": "contatoD2@example.com"
    },
    {
        "id": 9,
        "supplierId": 5,
        "name": "Contato E1",
        "phone": "5678-9012",
        "email": "contatoE1@example.com"
    },
    {
        "id": 10,
        "supplierId": 5,
        "name": "Contato E2",
        "phone": "5678-9013",
        "email": "contatoE2@example.com"
    },
    {
        "id": 11,
        "supplierId": 6,
        "name": "Contato F1",
        "phone": "6789-0123",
        "email": "contatoF1@example.com"
    },
    {
        "id": 12,
        "supplierId": 6,
        "name": "Contato F2",
        "phone": "6789-0124",
        "email": "contatoF2@example.com"
    },
    {
        "id": 13,
        "supplierId": 7,
        "name": "Contato G1",
        "phone": "7890-1234",
        "email": "contatoG1@example.com"
    },
    {
        "id": 14,
        "supplierId": 7,
        "name": "Contato G2",
        "phone": "7890-1235",
        "email": "contatoG2@example.com"
    },
    {
        "id": 15,
        "supplierId": 8,
        "name": "Contato H1",
        "phone": "8901-2345",
        "email": "contatoH1@example.com"
    },
    {
        "id": 16,
        "supplierId": 9,
        "name": "Contato I3",
        "phone": "8812-1956",
        "email": "contatoI3@example.com"
    }
]

const quotations = [
    { id: 1, productId: 3, date: "2023-01-10", price: 150.00 },
    { id: 2, productId: 7, date: "2023-02-15", price: 220.50 },
    { id: 3, productId: 12, date: "2023-03-20", price: 180.75 },
    { id: 4, productId: 5, date: "2023-04-05", price: 300.00 },
    { id: 5, productId: 9, date: "2023-05-12", price: 250.25 },
    { id: 6, productId: 2, date: "2023-06-18", price: 190.50 },
    { id: 7, productId: 8, date: "2023-07-22", price: 210.00 },
    { id: 8, productId: 10, date: "2023-08-29", price: 280.80 },
    { id: 9, productId: 1, date: "2023-09-07", price: 170.00 },
    { id: 10, productId: 14, date: "2023-10-14", price: 320.50 },
    { id: 11, productId: 6, date: "2023-11-19", price: 270.25 },
    { id: 12, productId: 13, date: "2023-12-25", price: 200.00 },
    { id: 13, productId: 4, date: "2024-01-02", price: 150.75 },
    { id: 14, productId: 11, date: "2024-02-08", price: 230.50 },
    { id: 15, productId: 15, date: "2024-03-15", price: 180.00 },
    { id: 16, productId: 3, date: "2024-04-20", price: 260.00 },
    { id: 17, productId: 7, date: "2024-05-25", price: 300.50 },
    { id: 18, productId: 12, date: "2024-06-30", price: 190.25 },
    { id: 19, productId: 5, date: "2024-07-07", price: 350.00 },
    { id: 20, productId: 9, date: "2024-08-12", price: 240.75 },
];

async function addData() {
    // Adds suppliers 
    for (const supplier of suppliers) {
        await setDoc(doc(db, 'suppliers', supplier.id.toString()), supplier);
    }

    // Adds products 
    for (const product of products) {
        await setDoc(doc(db, 'products', product.id.toString()), product);
    }

    // Adds contacts 
    for (const contact of contacts) {
        await setDoc(doc(db, 'contacts', contact.id.toString()), contact);
    }

    // Adds quotations 
    for (const quotation of quotations) {
        await setDoc(doc(db, 'quotations', quotation.id.toString()), quotation);
    }

    console.log("Dados adicionados com sucesso!");
}

addData().catch(console.error);
