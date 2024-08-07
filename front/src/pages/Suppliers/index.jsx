import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui";
import SupplierModal from "./Components/SupplierModal";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useSuppliers } from "@/hooks/useSuppliers";

export default function Suppliers() {
    const { data, setData } = useSuppliers();
    const [isCreateNewSupplierOpen, setIsCreateNewSupplierOpen] = useState(false);
    return (
        <div className="flex flex-col items-start w-[80%] mx-auto mt-6">
            <Button className="w-fit" onClick={() => setIsCreateNewSupplierOpen(prev => !prev)}><CirclePlus className="mr-2" />Create supplier</Button>
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


