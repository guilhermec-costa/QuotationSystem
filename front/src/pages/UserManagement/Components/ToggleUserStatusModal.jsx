import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMemo } from "react";
import UserService from "@/api/userService";

export default function ToggleUserStatusModal({ row, onConfirm }) {
    const { setData } = useUsers();

    const handleToggleStatus = async () => {
        const newStatus = row.status === "Active" ? "Inactive" : "Active";
        const userUpdated = {
            ...row,
            status: newStatus
        };

        try {
            await UserService.inactivate(row.id, userUpdated);
            setData(await UserService.list())
        } catch (error) {
            console.error('Error toggling user status:', error);
        } finally {
            onConfirm();
        }
    };

    const modalMessages = useMemo(() => {
        const action = row.status === "Active" ? "deactivate" : "activate";
        return {
            title: row.status === "Active" ?
                "Inactivating user" : "Activing user",
            description: `Are you sure you want to ${action} user "${row.email}"`
        }
    }, [row.email])

    return (
        <Dialog defaultOpen onOpenChange={onConfirm}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{row.status === "Active" ?
                        "Inactivating user" : "Activing user"}</DialogTitle>
                    <DialogDescription>
                        {modalMessages.description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex">
                    <Button type="submit" className="bg-destructive hover:bg-red-800" onClick={onConfirm}>Cancel</Button>
                    <Button type="submit" onClick={handleToggleStatus}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}