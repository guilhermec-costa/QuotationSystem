import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect } from "react";
import { useState } from "react";


export default function Products() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {

                const products = await fetch("http://localhost:3000/api/product", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                return await products.json();
            } catch (error) {
                console.log(error.message);
            }
        }
        getProducts().then(response => setData(response))

    }, []);


    return (
        <DataTable columns={columns} dataset={data} />
    )
};


