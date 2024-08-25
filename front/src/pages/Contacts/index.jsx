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
        <div className="flex flex-col items-start w-[80%] mx-auto mt-10">
            {/* Background styling */}
            {/* <div className="absolute inset-0 bg-gray-100 -z-10 shadow-lg shadow-slate-800/100"></div> */}
            <header className="w-full flex flex-col mb-6">
                <h1 className="text-2xl font-bold mb-2">Contact Management</h1>
                <p className="text-lg text-foreground">Manage your contacts. You can add, edit, or delete contacts from this section.</p>
            </header>

            <div className="flex items-center mb-4">
                <Button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300" 
                    onClick={() => setIsCreateNewContactModalOpen(prev => !prev)}>
                    <CirclePlus className="mr-2" />
                    Create Contact 
                </Button>
            </div>

            {/* Data Table */}
            <DataTable columns={columns} data={data} setData={setData} />

            {/* Contact Modal */}
            {isCreateNewContactOpen && (
                <ContactModal
                    mode="create"
                    setData={setData}
                    onConfirm={() => setIsCreateNewContactModalOpen(false)}
                    onCancel={() => setIsCreateNewContactModalOpen(false)}
                />
            )}
        </div>
    );
}
