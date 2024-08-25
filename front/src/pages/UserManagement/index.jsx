import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import CreateUserModal from "./Components/CreateUserModal";
import { useAuth } from "@/hooks/useAuth";

export default function UserManagement() {
    const { data, setData } = useUsers();
    const { getIsAdmin } = useAuth();
    const [isCreateNewUserModalOpen, setIsCreateNewUserModalOpen] = useState(false);
    return (
        <div className="flex flex-col items-start w-[80%] mx-auto mt-10">
            {/* <div className="h-full absolute bg-popover top-0 w-[55%] -z-10 flex left-1/2 -translate-x-1/2 shadow-lg shadow-slate-800/100"></div> */}
            <header className="w-full flex flex-col mb-6">
                <h1 className="text-2xl font-bold mb-2">User Management</h1>
                <p className="text-lg text-foreground">Manage your users. You can add, edit, or delete users from this section.</p>
            </header>

            {getIsAdmin() && (
                <div className="flex items-center mb-4">
                    <Button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300"
                        onClick={() => setIsCreateNewUserModalOpen(prev => !prev)}>
                        <CirclePlus className="mr-2" />
                        Create User
                    </Button>
                </div>
            )}

            <DataTable columns={columns} data={data} setData={setData} />
            {isCreateNewUserModalOpen && (
                <CreateUserModal
                    onConfirm={() => setIsCreateNewUserModalOpen(false)}
                    setData={setData}
                />
            )}
        </div>
    )
};


