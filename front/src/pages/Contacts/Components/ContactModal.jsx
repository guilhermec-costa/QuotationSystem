import { Button, Input, Separator, Select, Label } from "@/components/ui";
import { notifySuccess } from "@/components/ui/Toast/Toasters";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { SelectItem, SelectLabel, SelectGroup, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSuppliers } from "@/hooks/useSuppliers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ContactSchema = z.object({
    name: z.string(),
    phone: z.string(),  // Assumindo que o número de telefone tenha entre 10 e 15 caracteres
    email: z.string().email(),
    supplierName: z.string(),
});

const ContactModal = ({
    rowData, rowIndex, onOpenChange, onConfirm, mode, setData
}) => {
    const editAvailable = (mode === "edit" || mode === "create") ? true : false;
    const [contactMessages, setContactMessages] = useState({});
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(ContactSchema),
        defaultValues: rowData ? rowData : null
    });

    const { data: suppliersData } = useSuppliers(); // Função para obter os dados dos fornecedores

    const generateContactModalMessages = useCallback(() => {
        switch (mode) {
            case "edit": return { action: "Editing" }
            case "create": return { action: "Creating" }
            case "delete": return { action: "Deleting" }
            case "view": return { action: "Viewing" }
            default: return { action: "Editing" };  // Modo padrão para edição
        }
    }, [mode]);

    useEffect(() => {
        setContactMessages(generateContactModalMessages());
    }, [mode]);

    const deleteContactFromData = () => {
        setData(prevContacts => prevContacts.filter((_, i) => i !== rowIndex));
        onConfirm();
    };

    const renderActionButtons = useCallback(() => {
        switch (mode) {
            case "edit": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-gray-100 hover:bg-white" type="button" onClick={onOpenChange}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground hover:bg-green-600 font-bold" type="submit">Confirm</Button>
                    </div>
                )
            };
            case "delete": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-gray-100 hover:bg-white" onClick={onOpenChange}>Cancel</Button>
                        <Button className="w-[48%] bg-destructive text-card-foreground font-bold hover:bg-red-700" onClick={deleteContactFromData}>Delete</Button>
                    </div>
                )
            };
            case "create": {
                return (
                    <div className="my-3 w-full flex justify-between">
                        <Button className="w-[48%] bg-secondary-foreground hover:bg-white" onClick={onOpenChange}>Cancel</Button>
                        <Button className="w-[48%] bg-primary text-card-foreground font-bold hover:bg-green-500" type="submit">Create</Button>
                    </div>
                )
            }
        }
    }, [mode]);

    const updateContactDataset = (newContact) => {
        if (mode === "create") {
            setData(prev => {
                const lastItemId = Number(prev[prev.length - 1].id);
                newContact = {
                    ...newContact,
                    id: lastItemId + 1,
                    status: "In Stock"
                }
                return [...prev, newContact];
            });
            onConfirm();
            notifySuccess("Contact created!");
            return;
        }

        setData(prevContacts=> prevContacts.map((contact, i) => {
            if (i === rowIndex) {
                contact= {
                    ...contact,
                    ...newContact
                }
            }
            return contact 
        }))
        notifySuccess("Contact updated");
        onConfirm();
    };

    return (
        <Dialog defaultOpen={true} onOpenChange={onOpenChange}>
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

                    <Label htmlFor="supplierName">Supplier Name</Label>
                    {!!editAvailable ? (
                        <Select
                            disabled={!editAvailable}
                            {...register("supplierName")}
                            className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                    data-[supplierName-errors=true]:my-0.5 my-1"
                            data-supplierName-errors={!!errors.supplierName}
                            onValueChange={(value) => setValue("supplierName", value)}
                            defaultValue={rowData?.supplierName}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a supplier" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Suppliers</SelectLabel>
                                    {suppliersData.map(supplier => (
                                        <SelectItem key={supplier.id} value={supplier.name}>
                                            {supplier.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    ) :
                        (
                            <Input disabled={!editAvailable} {...register("supplierName")}
                                className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base
                                    data-[email-errors=true]:my-0.5 my-1"
                                data-email-errors={!!errors.supplierName}
                            />
                        )}
                    {errors.supplierName && <div className="form-error">{errors.supplierName.message}</div>}

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
