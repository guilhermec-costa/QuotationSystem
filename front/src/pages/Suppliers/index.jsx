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
        <div className="flex flex-col items-start w-[50%] mx-auto mt-10">
            {/* <div className="h-full absolute bg-popover top-0 w-[55%] -z-10 flex left-1/2 -translate-x-1/2 shadow-lg shadow-slate-800/100"></div> */}
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


