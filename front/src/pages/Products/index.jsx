import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui";
import ProductModal from "./Components/ProductModal";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";

export default function Products() {
    const { data, setData } = useProducts();
    const { getIsAdmin } = useAuth();
    const [isCreateNewProductModalOpen, setIsCreateNewProductModalOpen] = useState(false);

    return (
        <div className="flex flex-col items-start w-[80%] mx-auto mt-10">
            {/* <div className="h-full absolute bg-popover top-0 w-[100%] -z-10 flex left-1/2 -translate-x-1/2 shadow-lg shadow-slate-800/100"></div> */}

            <header className="w-full flex flex-col mb-6">
                <h1 className="text-2xl font-bold mb-2">Product Management</h1>
                <p className="text-lg text-foreground">Manage your product catalog efficiently. You can add, edit, or delete products from this section.</p>
            </header>

            {getIsAdmin() && (
                <div className="flex items-center mb-4">
                    <Button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300" onClick={() => setIsCreateNewProductModalOpen(prev => !prev)}>
                        <CirclePlus className="mr-2" />
                        Create Product
                    </Button>
                </div>
            )}

            {data.length > 0 ? (
                <DataTable columns={columns} data={data} setData={setData} />
            ) : (
                <div className="w-full p-4 text-center text-muted">No products available. Click "Create Product" to add a new one.</div>
            )}

            {isCreateNewProductModalOpen && (
                <ProductModal
                    mode="create"
                    setData={setData}
                    onConfirm={() => setIsCreateNewProductModalOpen(false)}
                />
            )}
        </div>
    );
}
