import SupplierService from "@/api/supplierService";
import { Button, Input, Separator } from "@/components/ui";
import { notifySuccess } from "@/components/ui/Toast/Toasters";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SupplierSchema = z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string().min(10).max(15),  
    email: z.string().email(),
});

const SupplierModal = ({
    rowData, onConfirm, mode, setData
}) => {
    const editAvailable = (mode === "edit" || mode === "create") ? true : false;
    const [supplierMessages, setSupplierMessages] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SupplierSchema),
        defaultValues: rowData ? rowData : null
    });

    const generateSupplierModalMessages = useCallback(() => {
        switch (mode) {
            case "edit": return { action: "Editing" }
            case "create": return { action: "Creating" }
            case "delete": return { action: "Deleting" }
            case "view": return { action: "Viewing" }
            default: return { action: "Editing" };  
        }
    }, [mode]);

    useEffect(() => {
        setSupplierMessages(generateSupplierModalMessages());
    }, [mode]);

    const deleteSupplierFromData = async () => {
        SupplierService.delete(rowData.id)
        notifySuccess("Supplier deleted");
        setData(await SupplierService.list());
        onConfirm();
    };

    const renderActionButtons = useCallback(() => {
        switch (mode) {
            case "edit": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-gray-100 hover:bg-white" type="button" onClick={onConfirm}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground hover:bg-green-600 font-bold" type="submit">Confirm</Button>
                    </div>
                )
            };
            case "delete": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-gray-100 hover:bg-white" onClick={onConfirm}>Cancel</Button>
                        <Button className="w-[48%] bg-destructive text-card-foreground font-bold hover:bg-red-700" onClick={deleteSupplierFromData}>Delete</Button>
                    </div>
                )
            };
            case "create": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-secondary-foreground hover:bg-white" onClick={onConfirm}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground font-bold hover:bg-green-500" type="submit">Create</Button>
                    </div>
                )
            }
        }
    }, [mode]);

    const updateSupplierDataset = async (newSupplier) => {
        if (mode === "create") {
            await SupplierService.create(newSupplier);
            notifySuccess("Supplier created");
        }

        else if (mode === "edit") {
            await SupplierService.updateOne(rowData.id, newSupplier);
            notifySuccess("Supplier updated");
        }

        setData(await SupplierService.list());
        onConfirm();
    };

    return (
        <Dialog defaultOpen={true} onOpenChange={onConfirm}>
            <DialogContent className="bg-secondary text-secondary-foreground">
                <DialogHeader>
                    <DialogTitle className="text-primary">{supplierMessages.action} supplier</DialogTitle>
                </DialogHeader>
                <Separator className="bg-card" />
                <form onSubmit={handleSubmit(updateSupplierDataset)}>
                    <Label htmlFor="name">Name</Label>
                    <Input disabled={!editAvailable} {...register("name")}
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                    data-[name-errors=true]:my-0.5 my-1"
                        data-name-errors={!!errors.name}
                    />
                    {errors.name && <div className="form-error">{errors.name.message}</div>}

                    <Label htmlFor="address">Address</Label>
                    <Input disabled={!editAvailable} {...register("address")}
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                    data-[address-errors=true]:my-0.5 my-1"
                        data-address-errors={!!errors.address}
                    />
                    {errors.address && <div className="form-error">{errors.address.message}</div>}

                    <Label htmlFor="phone">Phone</Label>
                    <Input disabled={!editAvailable} {...register("phone")}
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                    data-[phone-errors=true]:my-0.5 my-1"
                        data-phone-errors={!!errors.phone}
                    />
                    {errors.phone && <div className="form-error">{errors.phone.message}</div>}

                    <Label htmlFor="email">Email</Label>
                    <Input disabled={!editAvailable} {...register("email")}
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                    data-[email-errors=true]:my-0.5 my-1"
                        data-email-errors={!!errors.email}
                    />
                    {errors.email && <div className="form-error">{errors.email.message}</div>}

                    <Separator />
                    <div className="flex mx-auto w-full gap-4">
                        {renderActionButtons()}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SupplierModal;
