import { Button, Input, Separator, Select, Label } from "@/components/ui";
import { notifySuccess } from "@/components/ui/Toast/Toasters";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SelectItem, SelectLabel, SelectGroup, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const QuotationSchema = z.object({
    date: z.string().refine(val => val.match(/^\d{4}-\d{2}-\d{2}$/), {
        message: "Date must be in the format YYYY-MM-DD"
    }),
    price: z.string(),
    productName: z.string(),
});

const QuotationModal = ({
    rowData,
    rowIndex,
    onOpenChange,
    onConfirm,
    mode,
    setData
}) => {
    const editAvailable = mode === "edit" || mode === "create";
    const [quotationMessages, setQuotationMessages] = useState({});
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(QuotationSchema),
        defaultValues: rowData ? rowData : {}
    });

    const { data: products } = useProducts(); // Hook para obter os produtos disponíveis

    const generateQuotationModalMessages = useCallback(() => {
        switch (mode) {
            case "edit": return { action: "Editing" };
            case "create": return { action: "Creating" };
            case "delete": return { action: "Deleting" };
            case "view": return { action: "Viewing" };
            default: return { action: "Editing" }; // Modo padrão para edição
        }
    }, [mode]);

    useEffect(() => {
        setQuotationMessages(generateQuotationModalMessages());
    }, [mode]);

    const deleteQuotationFromData = () => {
        setData(prevQuotations => prevQuotations.filter((_, i) => i !== rowIndex));
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
                        <Button className="w-[48%] bg-destructive text-card-foreground font-bold hover:bg-red-700" onClick={deleteQuotationFromData}>Delete</Button>
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

    const updateQuotationDataset = (formData) => {
        const newQuotation = { ...formData };

        if (mode === "create") {
            setData(prev => {
                const lastItemId = prev.length > 0 ? prev[prev.length - 1].id : 0;
                newQuotation.id = lastItemId + 1;
                return [...prev, newQuotation];
            });
            notifySuccess("Quotation created!");
        } else {
            setData(prevQuotations => prevQuotations.map((quotation, i) => {
                if (i === rowIndex) {
                    return {
                        ...quotation,
                        ...newQuotation
                    };
                }
                return quotation;
            }));
            notifySuccess("Quotation updated!");
        }

        onConfirm();
    };

    return (
        <Dialog defaultOpen={true} onOpenChange={onOpenChange}>
            <DialogContent className="bg-secondary text-secondary-foreground">
                <DialogHeader>
                    <DialogTitle className="text-primary">{quotationMessages.action} quotation</DialogTitle>
                </DialogHeader>
                <Separator className="bg-card" />
                <form onSubmit={handleSubmit(updateQuotationDataset)}>
                    <Label htmlFor="productName">Product</Label>
                    <Select
                        disabled={!editAvailable}
                        {...register("productName")}
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base"
                        defaultValue={rowData?.productName}
                        onValueChange={value => setValue("productName", value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Products</SelectLabel>
                                {products.map(product => (
                                    <SelectItem key={product.id} value={product.name}>
                                        {product.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.productName && <div className="form-error">{errors.productName.message}</div>}

                    <Label htmlFor="date">Date</Label>
                    <Input
                        disabled={!editAvailable}
                        {...register("date")}
                        type="date"
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base"
                    />
                    {errors.date && <div className="form-error">{errors.date.message}</div>}

                    <Label htmlFor="price">Price</Label>
                    <Input
                        disabled={!editAvailable}
                        {...register("price")}
                        type="string"
                        className="focus-visible:ring-transparent ring-offset-transparent bg-background md:text-base"
                    />
                    {errors.price && <div className="form-error">{errors.price.message}</div>}

                    <Separator />
                    <div className="flex mx-auto w-full gap-4">
                        {renderActionButtons()}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default QuotationModal;
