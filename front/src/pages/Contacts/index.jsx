import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui";
import ContactModal from "./Components/ContactModal";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useContacts } from "@/hooks/useContacts";

export default function Contacts() {
    const { data, setData } = useContacts();
    const [isCreateNewContactOpen, setIsCreateNewContactModalOpen] = useState(false);
    return (
        <div className="flex flex-col items-start w-[80%] mx-auto mt-6">
            <Button className="w-fit" onClick={() => setIsCreateNewContactModalOpen(prev => !prev)}><CirclePlus className="mr-2" />Create contact</Button>
            <DataTable columns={columns} data={data} setData={setData} />
            {isCreateNewContactOpen && (
                <ContactModal
                    mode="create"
                    setData={setData}
                    onConfirm={() => setIsCreateNewContactModalOpen(false)}
                />
            )}
        </div>
    )
};


