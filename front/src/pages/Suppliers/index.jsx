import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui";
import SupplierModal from "./Components/SupplierModal";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useAuth } from "@/hooks/useAuth";

export default function Suppliers() {
    const { data, setData } = useSuppliers();
    const { getIsAdmin } = useAuth();
    const [isCreateNewSupplierOpen, setIsCreateNewSupplierOpen] = useState(false);
    return (
        <div className="flex flex-col items-start w-[80%] mx-auto mt-10">
            <header className="w-full flex flex-col mb-6">
                <h1 className="text-2xl font-bold mb-2">Supplier Management</h1>
                <p className="text-lg text-foreground">Manage your suppliers. You can add, edit, or delete suppliers from this section.</p>
            </header>

            {getIsAdmin() && (
                <div className="flex items-center mb-4">
                    <Button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300"
                        onClick={() => setIsCreateNewSupplierOpen(prev => !prev)}>
                        <CirclePlus className="mr-2" />
                        Create Supplier
                    </Button>
                </div>
            )}

            <DataTable columns={columns} data={data} setData={setData} />
            {isCreateNewSupplierOpen && (
                <SupplierModal
                    mode="create"
                    setData={setData}
                    onConfirm={() => setIsCreateNewSupplierOpen(false)}
                />
            )}
        </div>
    )
};


