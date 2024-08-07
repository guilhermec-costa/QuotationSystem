import ContactService from "@/api/contactService";
import { Button, Input, Separator, Select, Label } from "@/components/ui";
import { notifySuccess } from "@/components/ui/Toast/Toasters";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SelectItem, SelectLabel, SelectGroup, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSuppliers } from "@/hooks/useSuppliers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ContactSchema = z.object({
    name: z.string(),
    phone: z.string().min(10).max(13),  
    email: z.string().email(),
    supplierId: z.string()  
});

const ContactModal = ({
    rowData, onConfirm, mode, setData
}) => {
    const editAvailable = (mode === "edit" || mode === "create");
    const [contactMessages, setContactMessages] = useState({});
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(ContactSchema),
        defaultValues: rowData ? { ...rowData, supplierId: rowData.supplierId } : {} 
    });

    const { data: suppliersData } = useSuppliers(); 

    const generateContactModalMessages = useCallback(() => {
        switch (mode) {
            case "edit": return { action: "Editing" }
            case "create": return { action: "Creating" }
            case "delete": return { action: "Deleting" }
            case "view": return { action: "Viewing" }
            default: return { action: "Editing" };  
        }
    }, [mode]);

    useEffect(() => {
        setContactMessages(generateContactModalMessages());
    }, [mode]);

    const deleteContactFromData = async () => {
        await ContactService.delete(rowData.id);
        notifySuccess("Contact deleted");
        setData(await ContactService.list());
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
                );
            }
            case "delete": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-gray-100 hover:bg-white" onClick={onConfirm}>Cancel</Button>
                        <Button className="w-[48%] bg-destructive text-card-foreground font-bold hover:bg-red-700" onClick={deleteContactFromData}>Delete</Button>
                    </div>
                );
            }
            case "create": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-secondary-foreground hover:bg-white" onClick={onConfirm}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground font-bold hover:bg-green-500" type="submit">Create</Button>
                    </div>
                );
            }
            default:
                return null;
        }
    }, [mode]);

    const updateContactDataset = async (newContact) => {
        if (mode === "create") {
            await ContactService.create(newContact);
            notifySuccess("Contact created!");
        }

        else if (mode === "edit") {
            await ContactService.updateOne(rowData.id, newContact);
            notifySuccess("Contact updated");
        }

        setData(await ContactService.list());
        onConfirm();
    };

    return (
        <Dialog defaultOpen={true} onOpenChange={onConfirm}>
            <DialogContent className="bg-secondary text-secondary-foreground">
                <DialogHeader>
                    <DialogTitle className="text-primary">{contactMessages.action} contact</DialogTitle>
                </DialogHeader>
                <Separator className="bg-card" />
                <form onSubmit={handleSubmit(updateContactDataset)}>
                    <Label htmlFor="name">Name</Label>
                    <Input disabled={!editAvailable} {...register("name")}
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                    data-[name-errors=true]:my-0.5 my-1"
                        data-name-errors={!!errors.name}
                    />
                    {errors.name && <div className="form-error">{errors.name.message}</div>}

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

                    <Label htmlFor="supplierId">Supplier</Label>
                    {editAvailable ? (
                        <Select
                            disabled={!editAvailable}
                            className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                    data-[supplierId-errors=true]:my-0.5 my-1"
                            data-supplierId-errors={!!errors.supplierId}
                            onValueChange={(value) => setValue("supplierId", value)}
                            defaultValue={rowData?.supplierId}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a supplier" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Suppliers</SelectLabel>
                                    {suppliersData.map(supplier => (
                                        <SelectItem key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    ) : (
                        <Input disabled={!editAvailable} {...register("supplierId")}
                            className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                    data-[supplierId-errors=true]:my-0.5 my-1"
                            data-supplierId-errors={!!errors.supplierId}
                        />
                    )}
                    {errors.supplierId && <div className="form-error">{errors.supplierId.message}</div>}

                    <Separator />
                    <div className="flex mx-auto w-full gap-4">
                        {renderActionButtons()}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ContactModal;
