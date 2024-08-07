import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui";
import ProductModal from "./Components/ProductModal";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

export default function Products() {
    const { data, setData } = useProducts();
    const [isCreateNewProductModalOpen, setIsCreateNewProductModalOpen] = useState(false);
    return (
        <div className="flex flex-col items-start w-[80%] mx-auto mt-6">
            <Button className="w-fit" onClick={() => setIsCreateNewProductModalOpen(prev => !prev)}><CirclePlus className="mr-2" />Create product</Button>
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


