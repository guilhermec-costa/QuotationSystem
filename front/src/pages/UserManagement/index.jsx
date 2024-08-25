import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import CreateUserModal from "./Components/CreateUserModal";

export default function UserManagement() {
    const { data, setData } = useUsers();
    const [isCreateNewUserModalOpen, setIsCreateNewUserModalOpen] = useState(false);
    return (
        <div className="flex flex-col items-start w-[50%] mx-auto mt-10">
            {/* <div className="h-full absolute bg-popover top-0 w-[55%] -z-10 flex left-1/2 -translate-x-1/2 shadow-lg shadow-slate-800/100"></div> */}
            <Button className="w-fit" onClick={() => setIsCreateNewUserModalOpen(prev => !prev)}><CirclePlus className="mr-2" />Create User</Button>
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


