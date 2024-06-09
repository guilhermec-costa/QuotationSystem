import { useEffect } from "react";
import { useState } from "react";

const dataset = [
    {
        id: "1",
        name: "Keyboard",
        description: "A mechanical keyboard",
        price: 100,
        quantity: 5,
        status: "In Stock"
    },
    {
        id: "2",
        name: "Mouse",
        description: "A wireless mouse",
        price: 50,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        id: "3",
        name: "Monitor",
        description: "A 24-inch monitor",
        price: 200,
        quantity: 3,
        status: "In Stock"
    },
    {
        id: "4",
        name: "USB Cable",
        description: "A 2-meter USB-C cable",
        price: 15,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        id: "5",
        name: "Laptop",
        description: "A 15-inch laptop",
        price: 1500,
        quantity: 2,
        status: "In Stock"
    },
    {
        id: "6",
        name: "Desk Lamp",
        description: "An adjustable desk lamp",
        price: 30,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        id: "7",
        name: "Headphones",
        description: "Noise-canceling headphones",
        price: 120,
        quantity: 7,
        status: "In Stock"
    },
    {
        id: "8",
        name: "Mouse Pad",
        description: "A large mouse pad",
        price: 10,
        quantity: 0,
        status: "Out of Stock"
    },
    {
        id: "9",
        name: "Webcam",
        description: "A 1080p webcam",
        price: 70,
        quantity: 8,
        status: "In Stock"
    },
    {
        id: "10",
        name: "Smartphone",
        description: "A latest model smartphone",
        price: 800,
        quantity: 4,
        status: "Out of Stock"
    },
    {
        id: "11",
        name: "Tablet",
        description: "A 10-inch tablet",
        price: 600,
        quantity: 0,
        status: "In Stock"
    },
    {
        id: "12",
        name: "Charger",
        description: "A fast charger",
        price: 25,
        quantity: 30,
        status: "Out of Stock"
    },
    {
        id: "13",
        name: "Printer",
        description: "A color printer",
        price: 250,
        quantity: 1,
        status: "In Stock"
    },
    {
        id: "14",
        name: "Speakers",
        description: "Bluetooth speakers",
        price: 80,
        quantity: 12,
        status: "Out of Stock"
    },
    {
        id: "15",
        name: "External Hard Drive",
        description: "1TB external hard drive",
        price: 100,
        quantity: 0,
        status: "In Stock"
    }
];

const useProducts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
            } catch (error) {
                console.log(error.message);
            }
        }
        getProducts().then(() => setData(dataset))

    }, []);

    return { data, setData }
}

export default useProducts;
