import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui";
import QuotationModal from "./Components/QuotationModal";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useQuotations } from "@/hooks/useQuotations";

export default function Products() {
    const { data, setData } = useQuotations();
    const [isCreateNewQuotationModalOpen, setIsCreateNewQuotationModalOpen] = useState(false);
    return (
        <div className="flex flex-col items-start w-[80%] mx-auto mt-6">
            <Button className="w-fit" onClick={() => setIsCreateNewQuotationModalOpen(prev => !prev)}><CirclePlus className="mr-2" />Create quotation</Button>
            <DataTable columns={columns} data={data} setData={setData} />
            {isCreateNewQuotationModalOpen && (
                <QuotationModal
                    mode="create"
                    setData={setData}
                    onConfirm={() => setIsCreateNewQuotationModalOpen(false)}
                    onOpenChange={() => setIsCreateNewQuotationModalOpen(false)}
                />
            )}
        </div>
    )
};


