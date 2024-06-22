import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui";
import ProductModal from "./Components/ProductModal";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useContacts } from "@/hooks/useContacts";

export default function Products() {
    const { data, setData } = useContacts();
    console.log(data);
    const [isCreateNewContactOpen, setIsCreateNewContactModalOpen] = useState(false);
    return (
        <div className="flex flex-col items-start w-[80%] mx-auto mt-6">
            <Button className="w-fit" onClick={() => setIsCreateNewContactModalOpen(prev => !prev)}><CirclePlus className="mr-2" />Create contact</Button>
            <DataTable columns={columns} data={data} setData={setData} />
            {isCreateNewContactOpen && (
                <ProductModal
                    mode="create"
                    setData={setData}
                    onConfirm={() => setIsCreateNewContactModalOpen(false)}
                    onOpenChange={() => setIsCreateNewContactModalOpen(false)}
                />
            )}
        </div>
    )
};


