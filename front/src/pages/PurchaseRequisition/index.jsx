import { DataTable } from "./data-table";
import { columns } from "./columns";
import { usePurchaseRequisition } from "@/hooks/usePurchaseRequisitions";

export default function Products() {
    const { data, setData } = usePurchaseRequisition();
    return (
        <div className="flex flex-col items-start w-[50%] mx-auto mt-10">
            <DataTable columns={columns} data={data} setData={setData} />
        </div>
    )
};

