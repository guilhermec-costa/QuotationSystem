import { DataTable } from "./data-table";
import { columns } from "./columns";
import { usePurchaseRequisition } from "@/hooks/usePurchaseRequisitions";
import UpdateStatusModal from "./Components/UpdateStatusModal";
import { useState } from "react";

export default function PurchaseRequisition() {
    const { data, updateDataset } = usePurchaseRequisition();
    const [ isChangePurchaseModalOpen, setIsChangePurchaseModalOpen ] = useState(false);
    const [ purchaseToModify, setPurchaseToModify ] = useState({});

    return (
        <div className="flex flex-col items-start w-[80%] mx-auto mt-10">
            <header className="w-full flex flex-col mb-6">
                <h1 className="text-2xl font-bold mb-2">Purchase Requisition Management</h1>
                <p className="text-lg text-foreground">Manage your purchase requisitions. You can add, edit, or delete from this section.</p>
            </header>

            <DataTable 
                columns={columns} 
                data={data} 
                setChangePurchaseModalOpen={setIsChangePurchaseModalOpen} 
                purchaseSetter={setPurchaseToModify} />
            {isChangePurchaseModalOpen && (
            <UpdateStatusModal 
                setIsOpen={setIsChangePurchaseModalOpen}
                purchaseData={purchaseToModify}
                setData={updateDataset}
            />

            )}
        </div>
    )
};


