import { DataTable } from "./data-table";
import { columns } from "./columns";
import useProducts from "@/hooks/useProducts";
import { Button } from "@/components/ui";
import ProductModal from "./Components/ProductModal";
import { useState } from "react";

export default function Products() {
    const { data, setData } = useProducts();
    const [isCreateNewProductModalOpen, setIsCreateNewProductModalOpen] = useState(false);
    return (
        <div className="flex flex-col items-center">
            <Button className="self-end" onClick={() => setIsCreateNewProductModalOpen(prev => !prev)}>Create new product</Button>
            <DataTable columns={columns} data={data} setData={setData} />
            {isCreateNewProductModalOpen && (
                <ProductModal
                    mode="create"
                    setData={setData}
                    onConfirm={() => setIsCreateNewProductModalOpen(false)}
                />
            )}
        </div>
    )
};


